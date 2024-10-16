<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
        addressType?: 'billingAddress' | 'shippingAddress';
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
                'col-start-1 col-1': true,
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
    />

    <FormKit
        type="group"
        :name="addressType"
    >
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
        />
        <FormKit
            type="text"
            :label="$t('account.register.city.label')"
            name="city"
            :value="initialAddress?.city"
            :placeholder="$t('account.register.city.placeholder')"
            :errors="errorOfField(errorNameNested ? `${addressType}[city]` : 'city', formErrorStore.apiErrors)"
            validation="required"
        />
        <FormKit
            v-if="currentCountrycurrentCountry"
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
