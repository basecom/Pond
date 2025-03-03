<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

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
            :alt="getTranslatedProperty(media, 'alt') ?? label"
            :title="getTranslatedProperty(media, 'title') ?? label"
        />
    </div>
</template>
