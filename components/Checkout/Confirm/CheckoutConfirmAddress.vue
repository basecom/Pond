<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { AddressTypes } from '~/types/checkout/AddressTypes';
import { type ApiClientError } from '@shopware/api-client';
import type { BillingAddressForm, ShippingAddressForm } from '~/types/form/AddressForm';

const { signedIn } = useCustomerStore();
const { refreshSessionContext } = useContextStore();
const { handleError } = useFormErrorStore();
const { pushError } = useNotifications();
const { t } = useI18n();
const modalController = useModal();
const { refreshCart } = useCart();
const isLoading = ref(false);

const { changeDefaultAddress, saveAddress, syncBillingAddress, loadCustomerAddresses, customerAddresses } =
    useCustomerAddress();
const { activeShippingAddress, activeBillingAddress } = useCustomerAddress();
const { isShippingAddressForm } = useCheckType();
if (signedIn) {
    await loadCustomerAddresses();
}

const modalAddress = ref<Schemas['CustomerAddress']|null>(null);
const modalAddressType: Ref<AddressTypes> = ref('shippingAddress');
const billingAddressIsSameAsShippingAddress = ref(activeBillingAddress.value?.id === activeShippingAddress.value?.id);

watch(billingAddressIsSameAsShippingAddress, () => handleSameBillingAddress());

const handleSameBillingAddress = async () => {
    try {
        if (billingAddressIsSameAsShippingAddress.value) {
            await syncBillingAddress(
                billingAddressIsSameAsShippingAddress.value,
                activeShippingAddress.value.id,
                activeBillingAddress.value.id,
            );
            await refreshSessionContext();
            await refreshCart();
        }
    } catch (error) {
        pushError(t('global.generalError'));
        handleError(error as ApiClientError<never>);
    }
};

const handleChange = async (payload: { type: AddressTypes; id: string }) => {
    isLoading.value = true;

    try {
        await changeDefaultAddress(payload.type, payload.id, billingAddressIsSameAsShippingAddress.value);

        await refreshSessionContext();
        await refreshCart();

        isLoading.value = false;
        modalController.close();
    } catch (error) {
        isLoading.value = false;
        pushError(t('global.generalError'));
        handleError(error as ApiClientError<never>);
    }
};

const handleSave = async (payload: {
    type: AddressTypes;
    id: string|null;
  address: ShippingAddressForm|BillingAddressForm;
}) => {
    isLoading.value = true;

    const addressFields = isShippingAddressForm(payload.address) ? payload.address.shippingAddress : payload.address.billingAddress;
    const addressData = {
        ...payload.address,
        ...addressFields,
    };

    try {
        const savedAddress = await saveAddress(payload.id, addressData);
        await changeDefaultAddress(payload.type, savedAddress.id, billingAddressIsSameAsShippingAddress.value);

        await loadCustomerAddresses();
        await refreshSessionContext();
        await refreshCart();

        modalController.close();
    } catch (error) {
        handleError(error as ApiClientError<never>);
    } finally {
        isLoading.value = false;
    }
};

const openModal = (type:AddressTypes, address: Schemas['CustomerAddress']) => {
    modalAddress.value = address;
    modalAddressType.value = type;
    modalController.open();
};
</script>

<template>
    <CheckoutConfirmCard :title="$t('checkout.confirm.address.shipping')">
        <div class="flex w-full flex-col justify-between sm:flex-row sm:items-end">
            <AddressData
                v-if="activeShippingAddress"
                :address="activeShippingAddress"
                class="mb-4 sm:mb-0"
            />

            <FormKit
                type="submit"
                @click="openModal('shippingAddress', activeShippingAddress)"
            >
                {{ $t('global.change') }}
            </FormKit>
        </div>
    </CheckoutConfirmCard>

    <CheckoutConfirmCard :title="$t('checkout.confirm.address.billing')">
        <div class="flex w-full flex-col justify-between sm:flex-row sm:items-end">
            <div>
                <FormKit
                    v-model="billingAddressIsSameAsShippingAddress"
                    type="checkbox"
                    name="billingAddressSameAsShippingAddress"
                    :label="$t('checkout.confirm.address.sameAsShippingAddress')"
                    :classes="{
                        outer: 'mb-4',
                    }"
                />

                <AddressData
                    v-if="!billingAddressIsSameAsShippingAddress"
                    :address="activeBillingAddress"
                    class="mb-4 sm:mb-0"
                />
            </div>

            <FormKit
                v-if="!billingAddressIsSameAsShippingAddress"
                type="submit"
                @click="openModal('billingAddress', activeBillingAddress)"
            >
                {{ $t('global.change') }}
            </FormKit>
        </div>
    </CheckoutConfirmCard>

    <LazySharedModal
        :controller="modalController"
        size="lg"
        with-close-button
    >
        <template #title>
            {{
                modalAddressType === 'shippingAddress'
                    ? $t('checkout.confirm.address.modal.shippingHeading')
                    : $t('checkout.confirm.address.modal.billingHeading')
            }}
        </template>

        <template #content>
            <CheckoutConfirmChangeAddress
                v-if="modalAddress"
                :address-type="modalAddressType"
                :initial-address="modalAddress"
                :customer-addresses="customerAddresses"
                :is-loading="isLoading"
                @change="handleChange"
                @submit="handleSave"
            />
        </template>
    </LazySharedModal>
</template>
