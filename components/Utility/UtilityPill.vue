<script setup lang="ts">
withDefaults(
    defineProps<{
        content?: number | string | null;
    }>(),
    {
        content: null,
    },
);
</script>

<template>
    <span
        v-if="content"
        class="flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-brand-primary p-0.5 text-xs leading-none text-white outline outline-1 outline-white"
    >
        {{ content }}
    </span>
</template>
