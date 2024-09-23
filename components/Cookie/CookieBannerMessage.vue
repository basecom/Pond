<script setup lang="ts"></script>

<template>
    <div>
        <span>{{ $t('cookie.banner.message') }}</span>
        <LazySharedModal :with-close-button="true">
            <template #trigger>
                <button class="ml-2 text-status-info">
                    {{ $t('cookie.banner.additionalInformationTriggerButton') }}
                </button>
            </template>
            <template #title>{{ $t('cookie.banner.additionalInformationTitle') }}</template>
            <template #content>{{ $t('cookie.banner.additionalInformationText') }}</template>
        </LazySharedModal>
    </div>
</template>

<style scoped></style>
