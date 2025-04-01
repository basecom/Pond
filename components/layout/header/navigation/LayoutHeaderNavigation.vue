<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  navigationElements?: Schemas['Category'][];
  width?: number;
}>();
</script>

<template>
    <div class="hidden md:flex">
        <LayoutHeaderNavigationInner :navigation-elements="navigationElements" :width="width" />
    </div>
</template>
