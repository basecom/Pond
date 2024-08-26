<script setup lang="ts">
const props = defineProps<{
    title: string;
    subtitle?: string;
}>();
</script>

<template>
    <div class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6">
        <h3 v-if="title">
            {{ title }}
        </h3>

        <span class="text-sm" v-if="subtitle">
            {{ subtitle }}
        </span>

        <slot />
    </div>
</template>