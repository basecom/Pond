<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    label: string;
    description?: string;
    media?: Schemas['Media'];
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
        v-if="media"
        loading="lazy"
        :src="media.url"
        :alt="media.translated?.alt"
        :title="media.translated?.title"
        class="ml-auto max-h-6 max-w-full object-contain"
    />
</template>
