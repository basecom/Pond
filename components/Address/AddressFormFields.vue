<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { AddressTypes } from '~/types/checkout/AddressTypes';

const props = withDefaults(
    defineProps<{
        addressType?: AddressTypes;
        initialAddress?: Schemas['CustomerAddress'] | null;
        errorNameNested?: boolean;
    }>(),
    {
        addressType: 'billingAddress',
        initialAddress: null,
        errorNameNested: true,
    },
);

const sessionContext = useSessionContext();
const { getCountries } = useCountries();
const { getSalutations } = useSalutations();
const { errorOfField, entityArrayToOptions } = useFormkitHelper();
const formErrorStore = useFormErrorStore();
const configStore = useConfigStore();
const showAccountTypeSelection = configStore.get('core.loginRegistration.showAccountTypeSelection');
const accountTypeValue = ref(props.initialAddress?.company ? 'business' : 'private');

const countryOptions = computed(() => entityArrayToOptions<Schemas['Country']>(getCountries.value, 'name', true) ?? []);

const currentCountry = computed(() =>
    props.initialAddress ? props.initialAddress?.countryId : sessionContext.countryId.value,
);

const salutationOptions = computed(
    () => entityArrayToOptions<Schemas['Salutation']>(getSalutations.value, 'displayName', true) ?? [],
);

onUnmounted(() => formErrorStore.$reset);
</script>

<template>
    <div class="col-span-2">
        <span>{{ $t('account.register.addressHeading') }}</span>
    </div>

    <FormKit
        v-if="showAccountTypeSelection"
        v-model="accountTypeValue"
        type="select"
        :label="$t('account.register.accountType.label')"
        name="accountType"
        :errors="errorOfField('accountType', formErrorStore.apiErrors)"
        validation="required"
        :classes="{
            outer: {
                'col-span-2 sm:col-span-1 col-1': true,
            },
        }"
        :options="[
            { label: $t('account.register.accountType.private'), value: 'private' },
            { label: $t('account.register.accountType.company'), value: 'business' },
        ]"
    />

    <FormKit
        type="select"
        :label="$t('account.register.salutation.label')"
        name="salutationId"
        :value="initialAddress?.salutationId"
        :placeholder="$t('account.register.salutation.placeholder')"
        :errors="errorOfField('salutationId', formErrorStore.apiErrors)"
        validation="required"
        :classes="{
            outer: {
                'col-span-2 md:col-span-1 col-1': true,
            },
        }"
        :options="salutationOptions"
        :help="$t('account.register.salutation.help')"
    />

    <FormKit
        type="text"
        :label="$t('account.register.firstname.label')"
        name="firstName"
        :value="initialAddress?.firstName"
        :placeholder="$t('account.register.firstname.placeholder')"
        :errors="errorOfField('firstName', formErrorStore.apiErrors)"
        validation="required"
        :classes="{
            outer: {
                'col-span-2 sm:col-span-1 col-1': true,
            },
        }"
    />

    <FormKit
        type="text"
        :label="$t('account.register.lastname.label')"
        name="lastName"
        :value="initialAddress?.lastName"
        :placeholder="$t('account.register.lastname.placeholder')"
        :errors="errorOfField('lastName', formErrorStore.apiErrors)"
        validation="required"
        :classes="{
            outer: {
                'col-span-2 sm:col-span-1 col-2': true,
            },
        }"
    />

    <FormKit
        type="group"
        :name="addressType"
    >
        <FormKit
            v-if="accountTypeValue === 'business'"
            type="text"
            :label="$t('account.register.company.label')"
            name="company"
            :value="initialAddress?.company"
            :placeholder="$t('account.register.company.placeholder')"
            :errors="errorOfField('company', formErrorStore.apiErrors)"
            validation="required"
            :classes="{
                outer: {
                    'col-start-1 col-1 col-span-2': true,
                },
            }"
        />

        <FormKit
            type="text"
            :label="$t('account.register.street.label')"
            autocomplete="street-address"
            name="street"
            :value="initialAddress?.street"
            :placeholder="$t('account.register.street.placeholder')"
            :errors="errorOfField(errorNameNested ? `${addressType}[street]` : 'street', formErrorStore.apiErrors)"
            validation="required"
            :classes="{
                outer: {
                    'col-start-1 col-span-2': true,
                },
            }"
        />

        <FormKit
            type="text"
            :label="$t('account.register.zipCode.label')"
            name="zipcode"
            :value="initialAddress?.zipcode"
            :placeholder="$t('account.register.zipCode.placeholder')"
            :errors="errorOfField(errorNameNested ? `${addressType}[zipcode]` : 'zipcode', formErrorStore.apiErrors)"
            validation="required"
            :classes="{
                outer: {
                    'col-span-2 sm:col-span-1 col-1': true,
                },
            }"
        />

        <FormKit
            type="text"
            :label="$t('account.register.city.label')"
            name="city"
            :value="initialAddress?.city"
            :placeholder="$t('account.register.city.placeholder')"
            :errors="errorOfField(errorNameNested ? `${addressType}[city]` : 'city', formErrorStore.apiErrors)"
            validation="required"
            :classes="{
                outer: {
                    'col-span-2 sm:col-span-1 col-2': true,
                },
            }"
        />

        <FormKit
            v-if="currentCountry"
            type="select"
            :label="$t('account.register.country.label')"
            name="countryId"
            :placeholder="$t('account.register.country.placeholder')"
            validation="required"
            :options="countryOptions"
            :value="currentCountry"
            :classes="{
                outer: {
                    'col-span-2 md:col-span-1 col-1': true,
                },
            }"
        />
    </FormKit>
</template>
