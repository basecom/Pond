<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ChangePasswordForm } from '~/components/account/page/AccountPageProfileChangePasswordInner.vue';
import type { ChangeMailForm } from '~/components/account/page/AccountPageProfileChangeMailInner.vue';
import type * as z from 'zod';

defineProps<{
  customer: Schemas['Customer'];
}>();

const emits = defineEmits<{
  'update-personal-data': [personalDataForm: PersonalDataForm];
  'update-mail': [mailForm: ChangeMailForm];
  'update-password': [passwordForm: ChangePasswordForm];
}>();

const pondForm = usePondForm();
const schema = pondForm.getPersonalDataForm();
const dependencies = pondForm.getPersonalDataDependencies();
export type PersonalDataForm = z.infer<typeof schema>;

const changePersonalData = async (personalDataForm: PersonalDataForm) => {
    emits('update-personal-data', personalDataForm);
};
</script>

<template>
    <slot name="introduction">
        <h1 class="mb-4 text-xl font-bold md:mb-6 md:text-2xl">{{ $t('account.profile') }}</h1>
    </slot>

    <!-- personal data -->
    <slot name="personal-data-headline">
        <h3 class="mb-2 border-b border-gray-100 pb-2 text-lg font-bold md:mb-4">
            {{ $t('account.overview.personalData') }}
        </h3>
    </slot>

    <UiAutoForm
        v-auto-animate
        class="grid gap-4 md:grid-cols-2"
        :schema="schema"
        :dependencies="dependencies"
        @submit="changePersonalData"
    >
        <template #accountType="slotProps">
            <div class="md:col-span-2">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <template #salutation="slotProps">
            <div class="md:col-span-2">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <template #title="slotProps">
            <div class="md:col-span-2">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <template #birthday="slotProps">
            <div class="md:col-span-2">
                <UiAutoFormField v-bind="slotProps" />
            </div>
        </template>

        <slot name="submit-button">
            <UiButton type="submit" class="md:col-span-2">
                {{ $t('general.save') }}
            </UiButton>
        </slot>
    </UiAutoForm>

    <AccountPageProfileChangeMail
        :customer="customer"
        @update-mail="(mailForm: ChangeMailForm) => $emit('update-mail', mailForm)"
    />
    <AccountPageProfileChangePassword @update-password="(passwordForm: ChangePasswordForm) => $emit('update-password', passwordForm)" />
</template>
