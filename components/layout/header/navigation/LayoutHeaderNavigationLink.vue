<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
      navigationElement: Schemas['Category'];
      classes?: { [key: string]: boolean };
      showAsLink?: boolean;
      alternativeName?: string
    }>(),
    {
        classes: undefined,
        showAsLink: true,
        alternativeName: undefined,
    },
);

defineEmits<{
  click: [navigationElement: Schemas['Category'], categoryLink: string|null, options?: {target: string}];
}>();
</script>

<template>
    <LayoutHeaderNavigationLinkInner
        :navigation-element="navigationElement"
        :classes="classes"
        :show-as-link="showAsLink"
        @click="(navigationElement, categoryLink, options) => $emit('click', navigationElement, categoryLink, options)"
    >
        <template v-if="alternativeName" #link-name>
            {{ alternativeName }}
        </template>
    </LayoutHeaderNavigationLinkInner>
</template>
