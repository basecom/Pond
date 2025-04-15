<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  customer: Schemas['Customer'];
}>();

// const emits = defineEmits<{
//   'update-personal-data': [personalData: any];
//   'update-mail': [mailData: any];
//   'update-password': [passwordData: any];
// }>();

const pondForm = usePondForm();
const schema = pondForm.getPersonalDataForm();
const dependencies = pondForm.getPersonalDataDependencies();
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

    <!-- login data -->
    <h3 class="mb-2 mt-6 border-b border-gray-100 pb-2 text-lg font-bold md:mb-4 md:mt-8">
        {{ $t('account.overview.personalData') }}
    </h3>

    <p>{{ $t('account.customer.mail') }}: {{ customer.email }}</p>

    <UiAccordion type="single" class="w-full" collapsible>
        <UiAccordionItem value="mail">
            <UiAccordionTrigger class="text-base">E-Mail Adresse ändern</UiAccordionTrigger>
            <UiAccordionContent class="text-base">
                bae
            </UiAccordionContent>
        </UiAccordionItem>

        <UiAccordionItem value="password">
            <UiAccordionTrigger class="text-base">Password ändern</UiAccordionTrigger>
            <UiAccordionContent class="text-base">
                bae
            </UiAccordionContent>
        </UiAccordionItem>
    </UiAccordion>
</template>
