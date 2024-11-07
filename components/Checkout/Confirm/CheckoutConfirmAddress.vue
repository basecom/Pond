<script setup lang="ts">
import type { FormkitFields } from '~/types/formkit';
import type { Schemas } from '@shopware/api-client/api-types';

const { refreshContext, signedIn } = useCustomerStore();
const { handleError } = useFormErrorStore();
const { pushError } = useNotifications();
const { t } = useI18n();
const modalController = useModal();
const isLoading = ref(false);

const { changeDefaultAddress, saveAddress, syncBillingAddress, loadCustomerAddresses, customerAddresses } = useCustomerAddress();
const { activeShippingAddress, activeBillingAddress } = useCustomerAddress();
if (signedIn) {
    await loadCustomerAddresses();
}

const modalAddress = ref<Schemas['CustomerAddress']>(null);
const modalAddressType = ref('shippingAddress');

const billingAddressIsSameAsShippingAddress =
    activeBillingAddress.value?.id === activeShippingAddress.value?.id ? ref(true) : ref(false);

watch(billingAddressIsSameAsShippingAddress, () => handleSameBillingAddress());

const handleSameBillingAddress = async () => {
    try {
        if (billingAddressIsSameAsShippingAddress.value) {
            await syncBillingAddress(
                billingAddressIsSameAsShippingAddress.value,
                activeShippingAddress.value.id,
                activeBillingAddress.value.id,
            );
            await refreshContext();
        }
    } catch (error) {
        pushError(t('global.generalError'));
        handleError(error);
    }
};

const handleChange = async (payload: { type: 'shippingAddress' | 'billingAddress'; id: string }) => {
    isLoading.value = true;

    try {
        await changeDefaultAddress(payload.type, payload.id, billingAddressIsSameAsShippingAddress.value);

        await refreshContext();

        isLoading.value = false;
        modalController.close();
    } catch (error) {
        isLoading.value = false;
        pushError(t('global.generalError'));
        handleError(error);
    }
};

const handleSave = async (payload: {
    type: 'shippingAddress' | 'billingAddress';
    id: string;
    formFields: FormkitFields;
}) => {
    isLoading.value = true;

    const addressFields =
        payload.type === 'shippingAddress' ? payload.formFields.shippingAddress : payload.formFields.billingAddress;
    const addressData = {
        ...payload.formFields,
        ...addressFields,
    };

    try {
        const savedAddress = await saveAddress(payload.id, addressData);
        await changeDefaultAddress(payload.type, savedAddress.id, billingAddressIsSameAsShippingAddress.value);

        await loadCustomerAddresses();
        await refreshContext();

        isLoading.value = false;
        modalController.close();
    } catch (error) {
        isLoading.value = false;
        pushError(t('global.generalError'));
        handleError(error);
    }
};

const openModal = (type: 'shippingAddress' | 'billingAddress', address: Schemas['CustomerAddress']) => {
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
            <button
                class="rounded bg-brand-primary px-6 py-1 text-white hover:bg-brand-primary-dark"
                @click="openModal('shippingAddress', activeShippingAddress)"
            >
                {{ $t('global.change') }}
            </button>
        </div>
    </CheckoutConfirmCard>

    <CheckoutConfirmCard :title="$t('checkout.confirm.address.billing')">
        <div class="flex w-full flex-col justify-between sm:flex-row sm:items-end">
            <div>
                <FormKit
                    v-model="billingAddressIsSameAsShippingAddress"
                    type="checkbox"
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

            <button
                v-if="!billingAddressIsSameAsShippingAddress"
                class="rounded bg-brand-primary px-6 py-1 text-white hover:bg-brand-primary-dark"
                @click="openModal('billingAddress', activeBillingAddress)"
            >
                {{ $t('global.change') }}
            </button>
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
