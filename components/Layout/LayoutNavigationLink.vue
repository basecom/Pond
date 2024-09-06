<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = withDefaults(defineProps<{
    navigationElement: Schemas["Category"];
    activeClasses?: string|null;
    activeWithExactMatch?: boolean;
    classes?: string|null;
    asLink?: boolean;
}>(), {
    activeWithExactMatch: true,
    asLink: true,
})

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
        :rel="
            navigationElement.externalLink || navigationElement.linkNewTab
                ? 'noopener noreferrer nofollow'
                : ''
        "
        :aria-label="getTranslatedProperty(navigationElement, 'name')"
        :to="getCategoryRoute(navigationElement)"
        class="transition-all hover:text-brand-primary py-4"
        :class="[classes, isActive(navigationElement.seoUrls, activeWithExactMatch) ? activeClasses : '']"
    >
        {{ getTranslatedProperty(navigationElement, 'name') }}
    </NuxtLink>
   <div
       v-else
       class="text-black transition-all hover:text-brand-primary hover:cursor-pointer py-4 flex justify-between items-center"
       :class="[classes, isActive(navigationElement.seoUrls) ? activeClasses : '']"
   >
       <span>
           {{ getTranslatedProperty(navigationElement, 'name') }}
       </span>

       <FormKitIcon icon="chevron-right" class="block h-3 w-3" />
    </div>
</template>