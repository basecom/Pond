<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  navigationElements?: Schemas['Category'][];
}>();
</script>

<template>
    <LayoutHeaderNavigationInner class="hidden md:flex" :navigation-elements="navigationElements" />
</template>
