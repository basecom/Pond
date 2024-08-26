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
                class="animate-spin h-8 w-8 fill-status-important text-brand-primary"
            />
            <span class="sr-only">Loading...</span>
        </div>
    </Teleport>
    <template v-else>
        <div
            role="status"
            class="absolute top-0 flex h-full w-full place-content-center items-center"
        >
            <FormKitIcon
                icon="spinner"
                class="animate-spin fill-status-important text-brand-primary"
                :class="{
                    'h-8 w-8': size === 'normal',
                    'h-5 w-5': size === 'small',
                }"
            />
            <span class="sr-only">Loading...</span>
        </div>
    </template>
</template>
