<script setup lang="ts">
withDefaults(
    defineProps<{
        type?: 'info';
        message: string;
    }>(),
    {
        type: 'info',
    },
);
</script>

<template>
    <div class="no-products flex h-10 w-full items-center bg-brand-primary-light text-white">
        <div class="flex h-full w-10 items-center justify-center bg-brand-primary-dark">
            <div class="border-full flex h-6 w-6 items-center justify-center rounded-full border-2">
                <FormKitIcon
                    icon="info"
                    class="block h-3 w-3 rounded-full"
                />
            </div>
        </div>
        <div class="message pl-2 text-brand-primary-dark">
            {{ message }}
        </div>
    </div>
</template>
