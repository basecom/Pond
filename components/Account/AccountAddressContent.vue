<script setup lang="ts">
import type { FormkitFields } from '~/types/formkit';
import { useFormErrorStore } from '~/stores/FormErrorStore';
import { ApiClientError } from '@shopware/api-client';

const modalController = useModal();

const {
    customerAddresses,
    loadCustomerAddresses,
    createCustomerAddress,
    updateCustomerAddress,
    deleteCustomerAddress,
    setDefaultCustomerBillingAddress,
    setDefaultCustomerShippingAddress,
    errorMessageBuilder,
} = useAddress();
const { pushSuccess, pushError } = useNotifications();
const { t } = useI18n();
const formErrorStore = useFormErrorStore();

const loading = ref(true);
const selectedAddress = ref<Schemas['CustomerAddress']>(null);
const isEditMode = ref(false);
const isLoading = ref(false);

await loadCustomerAddresses();
loading.value = false;

const openEditModal = address => {
    selectedAddress.value = address;
    modalController.open();
    isEditMode.value = true;
};

const openCreateModal = () => {
    modalController.open();
    selectedAddress.value = null;
    isEditMode.value = false;
};

const handleSave = async (fields: FormkitFields) => {
    isLoading.value = true;

    try {
        const addressData = {
            ...fields,
            ...fields.billingAddress,
        };
        if (isEditMode.value) {
            await updateCustomerAddress({
                ...addressData,
                id: selectedAddress.value.id
            });
            pushSuccess('account.address.editSuccess')
        } else {
            await createCustomerAddress(addressData);
            pushSuccess('account.address.createSuccess')
        }
        await loadCustomerAddresses();
        modalController.close();
        isLoading.value = false;
    } catch (error) {
        console.log('error', error, error instanceof ApiClientError);
        isLoading.value = false;

        if (error instanceof ApiClientError) {
            formErrorStore.formErrors(error.details.errors);
            return;
        }

        formErrorStore.apiErrors.value.push({ key: 'register', code: 'REGISTER_GENERAL_ERROR' });
    }
};

const deleteAddress = async addressId => {
    try {
        await deleteCustomerAddress(addressId);
        await loadCustomerAddresses();
        pushError(t('account.address.deleteSuccess'))
    } catch (e) {
        pushError(t('account.address.deleteError'))
    }
};
</script>

<template>
    <h1 class="mb-2 font-bold">{{ $t('account.address.heading') }}</h1>
    <button
        class="mb-4 mt-4 rounded bg-brand-primary px-2 py-1 text-white"
        @click="openCreateModal"
    >
        {{ $t('account.address.create') }}
    </button>
    <div
        v-if="customerAddresses.length"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
        <div
            v-for="address in customerAddresses"
            :key="address.id"
            class="rounded-lg bg-white p-4 shadow"
        >
            <p class="font-semibold">{{ address.firstName }} {{ address.lastName }}</p>
            <p v-if="address.company">{{ address.company }}</p>
            <p>{{ address.street }}</p>
            <p>{{ address.zipcode }} {{ address.city }}</p>
            <p>{{ address.country.translated.name }}</p>
            <p v-if="address.phoneNumber">{{ address.phoneNumber }}</p>

            <div class="mt-2">
                <button
                    class="rounded bg-brand-primary px-2 py-1 text-white"
                    @click="openEditModal(address)"
                >
                    {{ $t('account.address.edit') }}
                </button>
                <button
                    class="ml-2 rounded bg-status-danger px-2 py-1 text-white"
                    @click="deleteAddress(address.id)"
                >
                    {{ $t('account.address.delete') }}
                </button>
            </div>
        </div>
    </div>
    <div v-else>
        <p>{{ $t('account.address.nothingFound') }}</p>
    </div>

    <LazySharedModal :controller="modalController">
        <template #content>
            <FormKit
                type="form"
                :submit-label="$t('account.register.submitLabel')"
                :classes="{
                    form: 'grid grid-cols-2 gap-3 w-full max-w-md',
                }"
                :config="{
                    validationVisibility: 'dirty',
                }"
                :actions="false"
                @submit="handleSave"
            >
                <ul
                    v-if="formErrorStore.apiErrors.filter(error => error.key === 'register').length"
                    class="validation-errors text-status-danger"
                >
                    <li
                        v-for="(error, index) in formErrorStore.apiErrors.filter(error => error.key === 'register')"
                        :key="`login-error-${index}`"
                    >
                        {{ error.code }}
                    </li>
                </ul>

                <AccountAddressFormFields :initial-address="selectedAddress" :error-name-nested="false" />

                <FormKit
                    type="submit"
                    :classes="{
                        outer: 'col-span-2 relative',
                    }"
                    :disabled="isLoading"
                >
                    <span
                        class="formkit-label"
                        :class="{
                            'opacity-0': isLoading,
                        }"
                    >
                        {{ $t('account.address.saveLabel') }}
                    </span>
                    <UtilityLoadingSpinner
                        v-if="isLoading"
                        size="small"
                    />
                </FormKit>
            </FormKit>
        </template>
    </LazySharedModal>
</template>
