<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    label: string;
    deliveryTime?: string;
    description?: string;
    media?: Schemas['Media'];
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
            class="block text-sm italic"
        >
            {{ description }}
        </span>

        <img
            v-if="media"
            loading="lazy"
            :src="media.url"
            :alt="media.translated?.alt ?? label"
            :title="media.translated?.title ?? label"
        >
    </div>
</template>
