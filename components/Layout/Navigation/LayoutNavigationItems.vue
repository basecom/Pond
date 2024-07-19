<script setup lang="ts">
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { Category, SeoUrl } from '@shopware-pwa/types';

defineProps<{
    navigationElements: Category[];
}>();

const isActive = (path: SeoUrl[] | null) => {
    if (!path) return false;

    const formattedPath = '/' + path[0]?.seoPathInfo;
    const { path: currentPath } = useRoute();
    return currentPath.includes(formattedPath);
};
</script>

<template>
    <template v-for="navigationElement in navigationElements" :key="navigationElement.id">
        <NuxtLink
            :target="navigationElement.externalLink || navigationElement.linkNewTab ? '_blank' : ''"
            :rel="navigationElement.externalLink || navigationElement.linkNewTab ? 'noopener noreferrer nofollow' : ''"
            :aria-label="getTranslatedProperty(navigationElement, 'name')"
            :to="getCategoryRoute(navigationElement)"
            class="border-neutral-ash border-b-2 py-3 md:min-w-max md:border-0 md:pb-2"
            :class="{
                'font-bold md:border-b-2 md:border-brand-primary':
                    getTranslatedProperty(navigationElement, 'name') == 'Gift cards' ||
                    isActive(navigationElement.seoUrls),
            }"
        >
            {{ getTranslatedProperty(navigationElement, 'name') }}
        </NuxtLink>
    </template>
</template>
