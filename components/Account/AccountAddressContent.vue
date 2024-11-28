<script setup lang="ts">
import type { FormkitFields } from '~/types/formkit';
import type { Schemas } from '@shopware/api-client/api-types';

const modalController = useModal();
const { handleError } = useFormErrorStore();

const { customerAddresses, loadCustomerAddresses, saveAddress, deleteAddress } = useCustomerAddress();

const { refreshContext } = useCustomerStore();
const { pushError } = useNotifications();
const { t } = useI18n();
const formErrorStore = useFormErrorStore();

const loading = ref(true);
const selectedAddress = ref<Schemas['CustomerAddress']>(null);
const isEditMode = ref(false);
const isLoading = ref(false);

await loadCustomerAddresses();
loading.value = false;

const openModal = (address: Schemas['CustomerAddress'] | null) => {
    if (address) {
        selectedAddress.value = address;
        isEditMode.value = true;
    } else {
        selectedAddress.value = null;
        isEditMode.value = false;
    }
    modalController.open();
};

const handleSave = async (fields: FormkitFields) => {
    isLoading.value = true;

    try {
        const addressData = {
            ...fields,
            ...fields.billingAddress,
        };

        await saveAddress(isEditMode.value ? selectedAddress.value.id : '', addressData);

        await loadCustomerAddresses();
        await refreshContext();

        modalController.close();
        isLoading.value = false;
    } catch (error) {
        isLoading.value = false;

        pushError(t('global.generalError'));
        handleError(error);
    }
};
</script>

<template>
    <h1 class="mb-2 font-bold">{{ $t('account.address.heading') }}</h1>
    <button
        class="mb-4 mt-4 rounded bg-brand-primary px-2 py-1 text-white"
        @click="openModal(null)"
    >
        {{ $t('account.address.create') }}
    </button>
    <div
        v-if="customerAddresses.length"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
        <AddressCard
            v-for="address in customerAddresses"
            :key="address.id"
            :address="address"
            @edit="openModal"
            @delete="deleteAddress"
        />
    </div>
    <div v-else>
        <p>{{ $t('account.address.nothingFound') }}</p>
    </div>

    <LazySharedModal :controller="modalController">
        <template #content>
            <FormKit
                type="form"
                name="addressForm"
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

                <AddressFormFields
                    :initial-address="selectedAddress"
                    :error-name-nested="false"
                />

                <FormKit
                    type="submit"
                    name="addressFormSubmit"
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
                        {{ $t('global.save') }}
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
