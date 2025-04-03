<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
      navigationElement: Schemas['Category'];
      classes?: { [key: string]: boolean };
    }>(),
    {
        classes: undefined,
    },
);
</script>

<template>
    <LayoutHeaderNavigationRecursiveLinkInner :navigation-element="navigationElement" :classes="classes" />
</template>
