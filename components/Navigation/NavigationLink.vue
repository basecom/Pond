<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';
import { useNavigationElement } from '~/composables/useNavigationElement';

const props = withDefaults(
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

const { isExternalLink, isInternalLink, linkNewTab, externalLink, getInternalRoute, path } = useNavigationElement(
    props.navigationElement,
);
if (isInternalLink) {
    await getInternalRoute();
}

const { isActive } = useActivePath();
const { trackNavigation } = useAnalytics();
</script>

<template>
    <NuxtLink
        v-if="asLink"
        :target="isExternalLink || linkNewTab ? '_blank' : ''"
        :rel="isExternalLink || linkNewTab ? 'noopener noreferrer nofollow' : ''"
        :aria-label="getTranslatedProperty(navigationElement, 'name')"
        :to="isExternalLink ? externalLink : isInternalLink ? path : getCategoryRoute(navigationElement)"
        class="transition-all hover:text-brand-primary"
        :class="[classes, isActive(navigationElement.seoUrls, activeWithExactMatch) ? activeClasses : '']"
        @click="trackNavigation(navigationElement.level ?? 0, getTranslatedProperty(navigationElement, 'name'))"
    >
        {{ getTranslatedProperty(navigationElement, 'name') }}
    </NuxtLink>
    <div
        v-else
        :class="[classes, isActive(navigationElement.seoUrls) ? activeClasses : '']"
    >
        <span>
            {{ getTranslatedProperty(navigationElement, 'name') }}
        </span>
    </div>
</template>
