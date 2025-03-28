<script setup lang="ts">
withDefaults(
    defineProps<{
        global?: boolean;
        size?: 'normal' | 'small';
    }>(),
    {
        global: false,
        size: 'normal',
    },
);

const { t } = useI18n();
</script>

<template>
    <Teleport
        v-if="global"
        to="#teleports"
    >
        <div
            role="status"
            class="fixed left-0 top-0 grid h-screen w-screen place-content-center bg-black/5"
        >
            <FormKitIcon
                icon="spinner"
                :title="t('icon.loading')"
                class="size-8 animate-spin fill-status-important text-brand-primary"
            />
            <span class="sr-only">{{ $t('utility.loadingSpinnerLabel') }}</span>
        </div>
    </Teleport>
    <template v-else>
        <div
            role="status"
            class="absolute top-0 flex size-full place-content-center items-center"
        >
            <FormKitIcon
                icon="spinner"
                :title="t('icon.loading')"
                class="animate-spin fill-status-important text-brand-primary"
                :class="{
                    'size-8': size === 'normal',
                    'size-5': size === 'small',
                }"
            />
            <span class="sr-only">{{ $t('utility.loadingSpinnerLabel') }}</span>
        </div>
    </template>
</template>
