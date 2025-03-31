<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware/helpers';

defineProps<{
  navigationElements?: Schemas['Category'][];
}>();
</script>

<template>
    <slot name="header-navigation">
        <div v-for="navigationElement in navigationElements" :key="navigationElement.id" class="relative">
            <slot name="header-navigation-name">
                {{ getTranslatedProperty(navigationElement, 'name') }}
            </slot>
        </div>
    </slot>
</template>
