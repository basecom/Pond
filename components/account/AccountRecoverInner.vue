<script setup lang="ts">
import * as z from 'zod';
const { t } = useI18n();

withDefaults(
    defineProps<{
        isLoading?: boolean;
        showSuccessMessage?: boolean;
    }>(),
    {
        isLoading: false,
        showSuccessMessage: false,
    },
);

const emits = defineEmits<{
    recover: [recoverData: RecoverData];
}>();

const schema = z.object({
    email: z
        .string({
            required_error: t('account.recover.email.error'),
        })
        .email(),
});

export type RecoverData = z.infer<typeof schema>;

const recover = (recoverData: RecoverData) => {
    emits('recover', recoverData);
};
</script>

<template>
    <slot name="wrapper">
        <div v-auto-animate>
            <slot name="success-message">
                <template v-if="showSuccessMessage">
                    <UiAlert variant="successful" class="mb-4 flex gap-4">
                        <Icon name="mdi:check" class="size-4 shrink-0" />

                        <div>
                            <UiAlertTitle>{{ $t('account.recover.successHeader') }}</UiAlertTitle>
                            <UiAlertDescription>
                                {{ $t('account.recover.successMessage') }}
                            </UiAlertDescription>
                        </div>
                    </UiAlert>
                </template>
            </slot>
            <slot name="header">
                <h1 class="text-lg font-semibold">{{ $t('account.recover.header') }}</h1>
                <hr>
            </slot>
            <slot name="info-text">
                <p class="pb-4 pt-2 text-sm">{{ $t('account.recover.information') }}</p>
            </slot>
            <slot name="form">
                <UiAutoForm
                    class="space-y-6"
                    :schema="schema"
                    :field-config="{
                        email: {
                            label: $t('account.recover.email.label'),
                            inputProps: {
                                type: 'email',
                                placeholder: $t('account.recover.email.placeholder'),
                            },
                        }
                    }"
                    @submit="recover"
                >
                    <slot name="buttons">
                        <div class="flex flex-wrap gap-4">
                            <slot name="back-button">
                                <UiButton variant="outline" class="w-fit grow sm:grow-0">
                                    <NuxtLinkLocale to="/account/login">{{ $t('account.recover.backButton') }}</NuxtLinkLocale>
                                </UiButton>
                            </slot>
                            <slot name="submit-button">
                                <UiButton type="submit" :is-loading="isLoading" class="min-w-52 grow">
                                    {{ $t('account.recover.submitButton') }}
                                </UiButton>
                            </slot>
                        </div>
                    </slot>
                </UiAutoForm>
            </slot>
        </div>
    </slot>
</template>
