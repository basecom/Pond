<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware/helpers';

defineProps<{
  navigationElements?: Schemas['Category'][];
}>();
</script>

<template>
    <div>
        <div v-for="navigationElement in navigationElements" :key="navigationElement.id">
            {{ getTranslatedProperty(navigationElement, 'name') }}
        </div>
    </div>
</template>
