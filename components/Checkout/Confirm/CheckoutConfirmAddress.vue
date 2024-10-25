<script setup lang="ts">
import type { FormkitFields } from '~/types/formkit';
import type { Schemas } from '@shopware/api-client/api-types';

const { customer } = storeToRefs(useCustomerStore());
const { refreshContext } = useCustomerStore();
const { handleError } = useFormErrorStore();
const { pushSuccess, pushError } = useNotifications();
const { t } = useI18n();
const modalController = useModal();
const isLoading = ref(false);

const {
    customerAddresses,
    loadCustomerAddresses,
    createCustomerAddress,
    updateCustomerAddress,
    setDefaultCustomerShippingAddress,
    setDefaultCustomerBillingAddress,
} = useAddress();

await loadCustomerAddresses();
const modalAddress = ref<Schemas['CustomerAddress']>(null);
const modalAddressType = ref('shippingAddress');

const activeShippingAddress = computed(() => customer.value.activeShippingAddress);
const activeBillingAddress = computed(() => customer.value.activeBillingAddress);
const billingAddressIsSameAsShippingAddress = activeBillingAddress.value.id === activeShippingAddress.value.id ? ref(true) : ref(false);

watch(billingAddressIsSameAsShippingAddress, () => handleSameBillingAddress());

const handleSameBillingAddress = async () => {
    //billingAddressIsSameAsShippingAddress.value = !billingAddressIsSameAsShippingAddress.value;
    console.log(billingAddressIsSameAsShippingAddress.value);

    if (billingAddressIsSameAsShippingAddress.value) {
        await syncBillingAddress(billingAddressIsSameAsShippingAddress.value, activeShippingAddress.value.id, activeBillingAddress.value.id);
        await refreshContext();
    }

    console.log(billingAddressIsSameAsShippingAddress.value);
    console.log(activeShippingAddress.value.id);
    console.log(activeBillingAddress.value.id);
}

const syncBillingAddress = async (sameBillingAddress: boolean, shippingId: string, billingId: string) => {
    if (sameBillingAddress && shippingId !== billingId) {
        try {
            await setDefaultCustomerBillingAddress(shippingId);
            pushSuccess(t('account.address.updateBillingSuccess'));
        } catch (error) {
            pushError(t('global.generalError'));
            handleError(error);
        }
    }
}

const handleChange = async (payload: {
    type: 'shippingAddress' | 'billingAddress',
    id: string,
}) => {
    isLoading.value = true;
    console.log(billingAddressIsSameAsShippingAddress.value);
    try {
        if (payload.type === 'shippingAddress' && payload.id !== activeShippingAddress.value.id) {
            await setDefaultCustomerShippingAddress(payload.id);
            await syncBillingAddress(billingAddressIsSameAsShippingAddress.value, payload.id, activeBillingAddress.value.id);
            pushSuccess(t('account.address.updateShippingSuccess'));
        }

        if (payload.type === 'billingAddress' && payload.id !== activeBillingAddress.value.id) {
            await setDefaultCustomerBillingAddress(payload.id);
            pushSuccess(t('account.address.updateBillingSuccess'));
        }

        await refreshContext();
        console.log(activeShippingAddress.value.id);
        console.log(activeBillingAddress.value.id);
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

    const addressFields = payload.type === 'shippingAddress' ? payload.formFields.shippingAddress : payload.formFields.billingAddress;
    const addressData = {
        ...payload.formFields,
        ...addressFields,
    };

    let savedAddress;
    if (payload.id !== '') {
        savedAddress = await updateAddress(addressData, payload.id);
    }

    if (payload.id === '') {
        savedAddress = await createAddress(addressData);
    }

    try {
        if (payload.type === 'shippingAddress' && savedAddress.id !== activeShippingAddress.value.id) {
            await setDefaultCustomerShippingAddress(savedAddress.id);
            await syncBillingAddress(billingAddressIsSameAsShippingAddress.value, savedAddress.id, activeBillingAddress.value.id);
        }

        if (payload.type === 'billingAddress' && savedAddress.id !== activeBillingAddress.value.id) {
            await setDefaultCustomerBillingAddress(savedAddress.id);
        }

        await refreshContext();
        await loadCustomerAddresses();

        isLoading.value = false;
        modalController.close();
    } catch (error) {
        isLoading.value = false;
        handleError(error);
    }
};


const updateAddress = async (addressData: FormkitFields, id: string) => {
    try {
        const savedAddress = await updateCustomerAddress({
            ...addressData,
            id: id,
        });
        pushSuccess(t('account.address.editSuccess'));
        return savedAddress;
    } catch (error) {
        handleError(error);
    }
}

const createAddress = async (addressData: FormkitFields) => {
    try {
        const savedAddress = await createCustomerAddress(addressData);
        pushSuccess(t('account.address.createSuccess'));
        return savedAddress;
    } catch (error) {
        handleError(error);
    }
}

const openModal = (type: 'shippingAddress' | 'billingAddress', address: Schemas['CustomerAddress']) => {
    modalAddress.value = address;
    modalAddressType.value = type;
    modalController.open();
}
</script>

<template>
    <CheckoutConfirmCard :title="$t('checkout.confirm.address.shipping')">
        <template v-if="customer">
            <div class="flex w-full sm:items-end justify-between flex-col sm:flex-row">
                <AddressData :address="activeShippingAddress" class="mb-4 sm:mb-0"/>
                <button
                    class="rounded bg-brand-primary px-6 py-1 text-white hover:bg-brand-primary-dark"
                    @click="openModal('shippingAddress', activeShippingAddress)"
                >
                    {{ $t('global.change') }}
                </button>
            </div>
        </template>
    </CheckoutConfirmCard>

    <CheckoutConfirmCard :title="$t('checkout.confirm.address.billing')">
        <template v-if="customer">
            <div class="flex w-full sm:items-end justify-between flex-col sm:flex-row">
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
                    class="rounded bg-brand-primary px-6 py-1 text-white hover:bg-brand-primary-dark"
                    @click="openModal('billingAddress', activeBillingAddress)"
                >
                    {{ $t('global.change') }}
                </button>
            </div>
        </template>
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
