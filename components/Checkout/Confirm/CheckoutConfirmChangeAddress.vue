<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { AddressTypes } from '~/types/checkout/AddressTypes';
import type { BillingAddressForm, ShippingAddressForm } from '~/types/form/AddressForm';

const props = withDefaults(
    defineProps<{
      addressType?: AddressTypes;
      initialAddress: Schemas['CustomerAddress'];
      customerAddresses: Schemas['CustomerAddress'][];
      isLoading?: boolean;
    }>(),
    {
        addressType: 'billingAddress',
        isLoading: false,
    },
);

const emit = defineEmits<{
  change: [payload: { type: AddressTypes; id: string; }];
  submit: [payload: {
      type: AddressTypes;
      id: string|null;
      address: ShippingAddressForm|BillingAddressForm;
    }];
}>();

const formErrorStore = useFormErrorStore();
const { pushError } = useNotifications();
const { t } = useI18n();
const mode: Ref<'edit-address'|'add-address'|'select-address'> = ref('select-address');
const selectedAddress: Ref<Schemas['CustomerAddress']> = ref(props.initialAddress);

const changeSelectedAddress = (newAddressId: string) => {
    const foundAddress = props.customerAddresses.find((address: Schemas['CustomerAddress']) => address.id === newAddressId);
    if (!foundAddress) {
        pushError(t('global.generalError'));
        return;
    }
    selectedAddress.value = foundAddress;
};

const addressText = (address: Schemas['CustomerAddress']) =>
    `${address.firstName} ${address.lastName} ${address.company ? address.company : ''} ${address.street} ${
        address.zipcode
    } ${address.city} ${address.country?.name}`;

const onSubmitAddress= (fields: ShippingAddressForm|BillingAddressForm) => {
    emit('submit', {
        type: props.addressType,
        id: mode.value === 'edit-address' ? selectedAddress.value.id : null,
        address: fields,
    });
};
</script>

<template>
    <!-- selected address -->
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
                input: {
                    'bg-brand-primary-dark': mode === 'edit-address'
                },
            }"
            @click="mode = 'edit-address'"
        >
            {{ $t('checkout.confirm.address.modal.editLabel') }}
        </FormKit>

        <FormKit
            type="button"
            :classes="{
                input: {
                    'bg-brand-primary-dark': mode === 'add-address'
                },
            }"
            @click="mode = 'add-address'"
        >
            {{ $t('checkout.confirm.address.modal.createLabel') }}
        </FormKit>

        <FormKit
            type="button"
            :classes="{
                input: {
                    'bg-brand-primary-dark': mode === 'select-address'
                },
            }"
            @click="mode = 'select-address'"
        >
            {{ $t('checkout.confirm.address.modal.selectLabel') }}
        </FormKit>
    </div>

    <div class="mb-4 border-b border-gray-light" />

    <!-- select address -->
    <template v-if="mode === 'select-address'">
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

    <!-- edit or add address -->
    <template v-if="mode === 'add-address' || mode === 'edit-address'">
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
            @submit="onSubmitAddress"
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
                :address-type="addressType"
                :initial-address="mode === 'edit-address' ? selectedAddress : null"
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
