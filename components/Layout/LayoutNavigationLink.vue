<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

withDefaults(
    defineProps<{
        navigationElement: Schemas['Category'];
        activeClasses?: string | null;
        activeWithExactMatch?: boolean;
        classes?: string | null;
        asLink?: boolean;
    }>(),
    {
        activeClasses: null,
        activeWithExactMatch: true,
        classes: null,
        asLink: true,
    },
);

const isActive = (path: Schemas['SeoUrl'][] | undefined, onlyExactMatch: boolean = false) => {
    if (!path) return false;

    const formattedPath = '/' + path[0]?.seoPathInfo;
    const { path: currentPath } = useRoute();

    return onlyExactMatch ? formattedPath === currentPath : currentPath.includes(formattedPath);
};
</script>

<template>
    <NuxtLink
        v-if="asLink"
        :target="navigationElement.externalLink || navigationElement.linkNewTab ? '_blank' : ''"
        :rel="navigationElement.externalLink || navigationElement.linkNewTab ? 'noopener noreferrer nofollow' : ''"
        :aria-label="getTranslatedProperty(navigationElement, 'name')"
        :to="getCategoryRoute(navigationElement)"
        class="py-4 transition-all hover:text-brand-primary"
        :class="[classes, isActive(navigationElement.seoUrls, activeWithExactMatch) ? activeClasses : '']"
    >
        {{ getTranslatedProperty(navigationElement, 'name') }}
    </NuxtLink>
    <div
        v-else
        class="flex items-center justify-between py-4 text-black transition-all hover:cursor-pointer hover:text-brand-primary"
        :class="[classes, isActive(navigationElement.seoUrls) ? activeClasses : '']"
    >
        <span>
            {{ getTranslatedProperty(navigationElement, 'name') }}
        </span>

        <FormKitIcon
            icon="chevron-right"
            class="block h-3 w-3"
        />
    </div>
</template>
