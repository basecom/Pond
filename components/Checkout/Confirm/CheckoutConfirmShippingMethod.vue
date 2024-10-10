<script setup lang="ts">
defineProps<{
    label: string;
    deliveryTime?: string;
    description?: string;
    mediaUrl?: string;
}>();
</script>
<template>
    <div>
        <span>
            {{ label }}
        </span>

        <span v-if="deliveryTime"> ({{ deliveryTime }}) </span>

        <span
            v-if="description"
            class="text-secondary-500 block text-sm italic"
        >
            {{ description }}
        </span>

        <img
            v-if="mediaUrl"
            loading="lazy"
            :src="mediaUrl"
            :alt="`Logo of ${label}`"
        />
    </div>
</template>
