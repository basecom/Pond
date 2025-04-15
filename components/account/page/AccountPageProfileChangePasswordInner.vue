<script setup lang="ts">
import * as z from 'zod';

const emits = defineEmits<{
  'update-password': [passwordForm: ChangePasswordForm];
}>();

const { t } = useI18n();

const schema = z.object({
    newPassword: z
        .string({
            required_error: t('account.login.password.errorGeneral'),
        }),

    newPasswordConfirm: z
        .string({
            required_error: t('account.login.password.errorGeneral'),
        }),

    password: z
        .string({
            required_error: t('account.login.password.errorGeneral'),
        }),
});
export type ChangePasswordForm = z.infer<typeof schema>;

const changePassword = async (passwordForm: ChangePasswordForm) => {
    emits('update-password', passwordForm);
};
</script>

<template>
    <h3 class="mt-6 border-b border-gray-100 pb-2 text-lg font-bold md:mt-8">
        {{ $t('account.personalProfile.changePassword.headline') }}
    </h3>

    <UiAccordion type="single" class="w-full" collapsible>
        <UiAccordionItem value="password" class="border-gray-100">
            <UiAccordionTrigger class="text-base">
                {{ $t('account.personalProfile.changePassword') }}
            </UiAccordionTrigger>
            <UiAccordionContent class="text-base">
                <UiAutoForm
                    v-auto-animate
                    class="grid gap-4 md:grid-cols-2"
                    :schema="schema"
                    :field-config="{
                        newPassword: {
                            label: $t('account.personalProfile.changePassword.newPassword'),
                            inputProps: {
                                type: 'password',
                                placeholder: $t('account.login.password.placeholder'),
                            },
                        },
                        newPasswordConfirm: {
                            label: $t('account.personalProfile.changePassword.confirmation'),
                            inputProps: {
                                type: 'password',
                                placeholder: $t('account.login.password.placeholder'),
                            },
                        },
                        password: {
                            label: $t('account.personalProfile.changePassword.oldPassword'),
                            inputProps: {
                                type: 'password',
                                placeholder: $t('account.login.password.placeholder'),
                            },
                        },
                    }"
                    @submit="changePassword"
                >
                    <template #password="slotProps">
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
            </UiAccordionContent>
        </UiAccordionItem>
    </UiAccordion>
</template>
