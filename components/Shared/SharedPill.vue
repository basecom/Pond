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
        class="grid h-3.5 min-w-3.5 items-center justify-center rounded-full bg-brand-primary p-0.5 text-xs leading-none text-white outline outline-1 outline-white"
    >
        {{ number }}
    </span>
</template>
