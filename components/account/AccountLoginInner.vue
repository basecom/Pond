<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';
import * as z from 'zod';

const customerStore = useCustomerStore();
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
type LoginData = z.infer<typeof schema>;

const errorMessage: Ref<null|string> = ref(null);
const isLoading = ref(false);

const login = async (loginData: LoginData) => {
    isLoading.value = true;
    try {
        await customerStore.login(loginData);
    } catch (error) {
        if (error instanceof ApiClientError) {
            errorMessage.value = t(`error.${ error.details.errors[0]?.code}`);
            return;
        }
    } finally {
        isLoading.value = false;
    }
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
            <slot name="passwort-forgotten">
                <UiButton variant="link" class="mb-6 justify-self-start px-0">
                    {{ $t('account.login.password.forgotten') }}
                </UiButton>
            </slot>

            <slot name="alert">
                <UiAlert v-if="errorMessage" variant="destructive" class="flex gap-4">
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
