<template>
    <div class="flex flex-col gap-1 lg:place-items-baseline">
        <span>
            {{ $t('cookie.banner.message') }}
        </span>

        <LazySharedModal
            :with-close-button="true"
            size="sm"
        >
            <template #trigger>
                <button class="text-status-info">
                    {{ $t('cookie.banner.additionalInformationTriggerButton') }}
                </button>
            </template>

            <template #title>
                {{ $t('cookie.banner.additionalInformationTitle') }}
            </template>

            <template #content>
                {{ $t('cookie.banner.additionalInformationText') }}
            </template>
        </LazySharedModal>
    </div>
</template>
