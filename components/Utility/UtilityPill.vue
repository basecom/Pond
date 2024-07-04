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
        class="bg-brand-primary text-white text-xs rounded-full p-0.5 h-3.5 min-w-3.5 leading-none outline outline-1 outline-white grid items-center justify-center"
    >
        {{ number }}
    </span>
</template>
