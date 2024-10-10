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
        class="grid h-3.5 w-fit items-center justify-center rounded-full bg-brand-primary py-0.5 px-1.5 text-xs leading-none text-white outline outline-1 outline-white"
    >
        {{ content }}
    </span>
</template>