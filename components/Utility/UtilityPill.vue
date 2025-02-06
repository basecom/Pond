<script setup lang="ts">
withDefaults(
    defineProps<{
        number?: number;
    }>(),
    {
        number: 0,
    },
);
</script>

<template>
    <span
        v-if="number > 0"
        class="grid h-4 min-w-4 items-center justify-center rounded-full bg-brand-primary text-xxs leading-none text-white"
    >
        {{ number }}
    </span>
</template>
