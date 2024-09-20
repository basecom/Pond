<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    navigationElements: Schemas['Category'];
}>();
</script>

<template>
    <div class="mt-4 grid gap-1 border-t-2 border-white pt-4 md:flex md:gap-6">
        <NavigationLink
            v-for="navigationElement in navigationElements"
            :key="navigationElement.id"
            :navigation-element="navigationElement"
        />
    </div>
</template>
