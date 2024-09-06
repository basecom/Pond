<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    navigationElement: Schemas["Category"];
    activeClasses?: string|null
}>()

const isActive = (path: Schemas['SeoUrl'][] | undefined) => {
    if (!path) return false;

    const formattedPath = '/' + path[0]?.seoPathInfo;
    const { path: currentPath } = useRoute();
    return currentPath.includes(formattedPath);
};
</script>

<template>
    <NuxtLink
        :target="navigationElement.externalLink || navigationElement.linkNewTab ? '_blank' : ''"
        :rel="
            navigationElement.externalLink || navigationElement.linkNewTab
                ? 'noopener noreferrer nofollow'
                : ''
        "
        :aria-label="getTranslatedProperty(navigationElement, 'name')"
        :to="getCategoryRoute(navigationElement)"
        class="text-neutral-black transition-all hover:text-brand-primary py-2"
        :class="isActive(navigationElement.seoUrls) ? activeClasses : ''"
    >
        {{ getTranslatedProperty(navigationElement, 'name') }}
    </NuxtLink>
</template>