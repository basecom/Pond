<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { FormkitFields } from '~/types/formkit';

const props = defineProps<{
    addressType: 'billingAddress' | 'shippingAddress';
    initialAddress: Schemas['CustomerAddress'];
    customerAddresses: Schemas['CustomerAddress'][];
    isLoading: Ref<boolean>;
}>();

const emit = defineEmits<{
    (
        event: 'change',
        payload: {
            type: 'billingAddress' | 'shippingAddress';
            id: string;
        },
    ): void;
    (
        event: 'submit',
        payload: {
            type: 'billingAddress' | 'shippingAddress';
            id: string;
            formFields: FormkitFields;
        },
    ): void;
}>();

const form = useFormKitContext();
const formErrorStore = useFormErrorStore();
const { pushError } = useNotifications();
const { t } = useI18n();
const isEditMode = ref(false);
const isCreateMode = ref(false);

const selectedAddress: Ref<Schemas['CustomerAddress']> = ref(props.initialAddress);

const changeSelectedAddress = (newAddressId: string) => {
    const foundAddress = props.customerAddresses.filter(address => address.id === newAddressId);
    if (foundAddress.length != 1) {
        pushError(t('global.generalError'));
        return;
    }
    selectedAddress.value = foundAddress[0];
};

const changeMode = (mode: string) => {
    if (mode === 'select') {
        isEditMode.value = false;
        isCreateMode.value = false;
        return;
    }
    if (mode === 'edit') {
        isEditMode.value = true;
        isCreateMode.value = false;
        return;
    }
    if (mode === 'new') {
        isEditMode.value = false;
        isCreateMode.value = true;
        return;
    }
};

const addressText = (address: Schemas['CustomerAddress']) => {
    return (
        address.firstName +
        ' ' +
        address.lastName +
        ' ' +
        (address.company ? address.company : '') +
        ' ' +
        address.street +
        ' ' +
        address.zipcode +
        ' ' +
        address.city +
        ' ' +
        address.country?.name
    );
};
</script>

<template>
    <h2 class="mb-4 text-lg">
        {{ $t('checkout.confirm.address.modal.chosenAddress') }}
    </h2>

    <AddressData
        :address="selectedAddress"
        class="mb-4 p-4"
    />

    <div class="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <FormKit
            type="button"
            :classes="{
                input: isEditMode ? 'bg-brand-primary-dark' : '',
            }"
            @click="changeMode('edit')"
        >
            {{ $t('checkout.confirm.address.modal.editLabel') }}
        </FormKit>

        <FormKit
            type="button"
            :classes="{
                input: isCreateMode ? 'bg-brand-primary-dark' : '',
            }"
            @click="changeMode('new')"
        >
            {{ $t('checkout.confirm.address.modal.createLabel') }}
        </FormKit>

        <FormKit
            type="button"
            :classes="{
                input: !isEditMode && !isCreateMode ? 'bg-brand-primary-dark' : '',
            }"
            @click="changeMode('select')"
        >
            {{ $t('checkout.confirm.address.modal.selectLabel') }}
        </FormKit>
    </div>

    <div class="mb-4 border-b border-gray-light" />

    <template v-if="!isEditMode && !isCreateMode">
        <h2 class="mb-4 text-lg">
            {{ $t('checkout.confirm.address.modal.selectHeading') }}
        </h2>

        <div class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button
                v-for="address in customerAddresses"
                :key="address.id"
                :aria-label="$t('checkout.confirm.address.modal.ariaLabel')"
                :aria-description="addressText(address)"
                class="mb-4 p-4 text-left"
                :class="[address.id === selectedAddress.id ? 'bg-gray-light' : 'hover:bg-gray-light']"
                @click="changeSelectedAddress(address.id)"
            >
                <AddressData :address="address" />
            </button>
        </div>

        <FormKit
            type="submit"
            :disabled="isLoading"
            @click="
                emit('change', {
                    type: addressType,
                    id: selectedAddress.id,
                })
            "
        >
            <span :class="{ 'opacity-0': isLoading }">
                {{ $t('checkout.confirm.address.modal.selectSubmitLabel') }}
            </span>

            <UtilityLoadingSpinner
                v-if="isLoading"
                size="small"
            />
        </FormKit>
    </template>

    <template v-if="isEditMode || isCreateMode">
        <FormKit
            type="form"
            name="address"
            :classes="{
                form: 'grid grid-cols-2 gap-3',
            }"
            :config="{
                validationVisibility: 'dirty',
            }"
            :actions="false"
            @submit="
                emit('submit', {
                    type: addressType,
                    id: isEditMode ? selectedAddress.id : '',
                    formFields: form.value.address,
                })
            "
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
                v-if="isEditMode"
                :address-type="addressType"
                :initial-address="selectedAddress"
                :error-name-nested="false"
            />

            <AddressFormFields
                v-else-if="isCreateMode"
                :address-type="addressType"
                :error-name-nested="false"
            />

            <FormKit
                type="submit"
                :classes="{
                    outer: 'col-span-2 relative my-2',
                }"
                :disabled="isLoading"
            >
                <span
                    class="formkit-label"
                    :class="{
                        'opacity-0': isLoading,
                    }"
                >
                    {{ $t('checkout.confirm.address.modal.formSubmitLabel') }}
                </span>

                <UtilityLoadingSpinner
                    v-if="isLoading"
                    size="small"
                />
            </FormKit>
        </FormKit>
    </template>
</template>
