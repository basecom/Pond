<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  customer: Schemas['Customer'];
}>();

const configStore = useConfigStore();
const showTitle = configStore.get('core.loginRegistration.showTitleField') as boolean;
</script>

<template>
    <slot name="introduction">
        <h1 class="text-xl font-bold md:text-2xl">{{ $t('account.account') }}</h1>
        <p class="my-2">{{ $t('account.overview.description') }}</p>
    </slot>

    <div class="mt-8 grid gap-8 md:grid-cols-2">
        <!-- personal data -->
        <slot name="personal-data">
            <div>
                <slot name="personal-data-headline">
                    <h3 class="mb-2 border-b border-gray-100 text-lg font-bold">
                        {{ $t('account.overview.personalData') }}
                    </h3>
                </slot>

                <slot name="personal-data-content">
                    <div class="grid grid-cols-[4fr_8fr] gap-2">
                        <span v-if="customer.salutation" class="font-semibold">{{ $t('account.customer.salutation') }}</span>
                        <span>{{ customer.salutation?.displayName }}</span>

                        <template v-if="showTitle && customer.title">
                            <span class="font-semibold">{{ $t('account.customer.title') }}</span>
                            <span>{{ customer.title }}</span>
                        </template>

                        <span class="font-semibold">{{ $t('account.customer.name') }}</span>
                        <span>{{ customer.firstName }} {{ customer.lastName }}</span>

                        <span class="font-semibold">{{ $t('account.customer.mail') }}</span>
                        <span>{{ customer.email }}</span>

                        <template v-if="customer.accountType === 'business'">
                            <span class="font-semibold">{{ $t('account.customer.companyName') }}</span>
                            <span>{{ customer.company }}</span>

                            <span class="font-semibold">{{ $t('account.customer.vat') }}</span>
                            <span>{{ customer.vatIds?.join(', ') }}</span>
                        </template>
                    </div>
                </slot>
            </div>
        </slot>

        <!-- default payment method -->
        <slot name="payment-method">
            <div>
                <slot name="payment-method-headline">
                    <h3 class="mb-2 border-b border-gray-100 text-lg font-bold">
                        {{ $t('account.overview.defaultPaymentMethod') }}
                    </h3>
                </slot>

                <slot name="payment-method-content">
                    <b>{{ customer.defaultPaymentMethod?.translated.name }}</b>
                    <p class="text-sm">{{ customer.defaultPaymentMethod?.translated.description }}</p>
                </slot>
            </div>
        </slot>

        <!-- default billing address -->
        <slot name="billing-address">
            <div v-if="customer.defaultBillingAddress">
                <slot name="billing-address-headline">
                    <h3 class="mb-2 border-b border-gray-100 text-lg font-bold">
                        {{ $t('account.overview.defaultBillingAddress') }}
                    </h3>
                </slot>

                <slot name="billing-address-content">
                    <div class="space-y-2">
                        <p v-if="customer.defaultBillingAddress.company || customer.defaultBillingAddress.department" class="font-bold">
                            {{ [customer.defaultBillingAddress.company, customer.defaultBillingAddress.department].join(' - ') }}
                        </p>
                        <p>{{ customer.defaultBillingAddress.firstName }} {{ customer.defaultBillingAddress.lastName }}</p>
                        <p>{{ customer.defaultBillingAddress.street }}</p>
                        <p>{{ customer.defaultBillingAddress.zipcode }} {{ customer.defaultBillingAddress.city }}</p>
                        <p v-if="customer.defaultBillingAddress.additionalAddressLine1">
                            {{ customer.defaultBillingAddress.additionalAddressLine1 }}
                        </p>
                        <p v-if="customer.defaultBillingAddress.additionalAddressLine2">
                            {{ customer.defaultBillingAddress.additionalAddressLine2 }}
                        </p>
                        <p>
                            <template v-if="customer.defaultBillingAddress.countryState">
                                {{ customer.defaultBillingAddress.countryState.name }},
                            </template>
                            {{ customer.defaultBillingAddress.country?.name }}
                        </p>
                    </div>
                </slot>
            </div>
        </slot>

        <!-- default shipping address -->
        <slot name="shipping-address">
            <div v-if="customer.defaultShippingAddress">
                <slot name="shipping-address-headline">
                    <h3 class="mb-2 border-b border-gray-100 text-lg font-bold">
                        {{ $t('account.overview.defaultShippingAddress') }}
                    </h3>
                </slot>

                <slot name="shipping-address-content">
                    <div class="space-y-2">
                        <template v-if="customer.defaultBillingAddressId === customer.defaultShippingAddressId">
                            <slot name="shipping-address-identical">
                                {{ $t('account.overview.addressesIdentical') }}
                            </slot>
                        </template>

                        <template v-else>
                            <slot name="shipping-address-not-identical">
                                <p v-if="customer.defaultShippingAddress.company || customer.defaultShippingAddress.department" class="font-bold">
                                    {{ [customer.defaultShippingAddress.company, customer.defaultShippingAddress.department].join(' - ') }}
                                </p>
                                <p>{{ customer.defaultShippingAddress.firstName }} {{ customer.defaultShippingAddress.lastName }}</p>
                                <p>{{ customer.defaultShippingAddress.street }}</p>
                                <p>{{ customer.defaultShippingAddress.zipcode }} {{ customer.defaultShippingAddress.city }}</p>
                                <p v-if="customer.defaultShippingAddress.additionalAddressLine1">
                                    {{ customer.defaultShippingAddress.additionalAddressLine1 }}
                                </p>
                                <p v-if="customer.defaultShippingAddress.additionalAddressLine2">
                                    {{ customer.defaultShippingAddress.additionalAddressLine2 }}
                                </p>
                                <p>
                                    <template v-if="customer.defaultShippingAddress.countryState">
                                        {{ customer.defaultShippingAddress.countryState.name }},
                                    </template>
                                    {{ customer.defaultShippingAddress.country?.name }}
                                </p>
                            </slot>
                        </template>
                    </div>
                </slot>
            </div>
        </slot>
    </div>
</template>
