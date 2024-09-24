<script setup lang="ts">
withDefaults(
    defineProps<{
        type?: 'info';
        message: string;
    }>(),
    {
        type: 'info'
    },
);
</script>

<template>
    <div class="no-products text-white h-10 w-full flex bg-brand-primary-light items-center">
        <div class="flex items-center justify-center bg-brand-primary-dark h-full w-10">
        <div class="border-full flex items-center justify-center h-6 w-6 rounded-full border-2">
        <FormKitIcon
            icon="info"
            class="h-3 w-3 block rounded-full "
        />
        </div>
        </div>
        <div class="pl-2 message text-brand-primary-dark">
            {{message }}
        </div>
    </div>
</template>