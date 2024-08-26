<script setup lang="ts">
const props = defineProps<{
    title: string;
    subtitle?: string;
}>();
</script>

<template>
    <div class="grid gap-4 bg-white px-4 py-5 shadow sm:p-6">
        <h3 v-if="title">
            {{ props.title }}
        </h3>

        <span
            v-if="subtitle"
            class="text-sm"
        >
            {{ props.subtitle }}
        </span>

        <slot />
    </div>
</template>
