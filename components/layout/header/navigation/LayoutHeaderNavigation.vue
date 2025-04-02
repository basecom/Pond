<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  navigationElements?: Schemas['Category'][];
}>();
</script>

<template>
    <div class="hidden md:flex md:overflow-auto">
        <LayoutHeaderNavigationInner :navigation-elements="navigationElements" />
    </div>
</template>
