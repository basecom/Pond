<script setup lang="ts">
defineProps<{
    label: string;
    description?: string;
    mediaUrl?: string;
}>();
</script>

<template>
    <div class="ml-1">
        <span>
            {{ label }}
        </span>

        <span
            v-if="description"
            class="block text-sm"
        >
            {{ description }}
        </span>
    </div>
    <img
        v-if="mediaUrl"
        loading="lazy"
        :src="mediaUrl"
        :alt="`Logo of ${label}`"
        class="ml-auto max-h-6 max-w-full object-contain"
    />
</template>
