<script setup lang="ts">
import * as z from 'zod';

withDefaults(
    defineProps<{
      isLoading?: boolean;
      errorMessage?: string;
    }>(),
    {
        isLoading: false,
        errorMessage: undefined,
    },
);

const emits = defineEmits<{
  login: [loginData: LoginData];
}>();

const { t } = useI18n();

const schema = z.object({
    username: z
        .string({
            required_error: t('account.login.email.error'),
        })
        .email(),

    password: z
        .string({
            required_error: t('account.login.password.errorGeneral'),
        }),
});
export type LoginData = z.infer<typeof schema>;

const login = async (loginData: LoginData) => {
    emits('login', loginData);
};
</script>

<template>
    <UiAutoForm
        class="space-y-6"
        :schema="schema"
        :field-config="{
            username: {
                label: $t('account.login.email.label'),
                inputProps: {
                    type: 'email',
                    placeholder: $t('account.login.email.placeholder'),
                },
            },
            password: {
                label: $t('account.login.password.label'),
                inputProps: {
                    type: 'password',
                    placeholder: $t('account.login.password.placeholder'),
                },
            },
        }"
        @submit="login"
    >
        <div class="!mt-0 grid">
            <slot name="password-forgotten">
                <NuxtLinkLocale to="/account/todo" class="mb-6 justify-self-start py-2 text-sm underline underline-offset-4">
                    {{ $t('account.login.password.forgotten') }}
                </NuxtLinkLocale>
            </slot>

            <slot name="alert">
                <UiAlert v-if="errorMessage" variant="destructive" class="mb-4 flex gap-4">
                    <slot name="alert-icon">
                        <Icon name="mdi:alert-circle-outline" class="size-4 text-red-500" />
                    </slot>

                    <div>
                        <UiAlertTitle>{{ $t('error.generalHeadline') }}</UiAlertTitle>
                        <UiAlertDescription>
                            {{ errorMessage }}
                        </UiAlertDescription>
                    </div>
                </UiAlert>
            </slot>

            <slot name="submit-button">
                <UiButton type="submit" :is-loading="isLoading">
                    {{ $t('account.auth.login') }}
                </UiButton>
            </slot>
        </div>
    </UiAutoForm>
</template>
