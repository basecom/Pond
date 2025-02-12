<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = withDefaults(
    defineProps<{
        navigationElement: Schemas['Category'];
        activeClasses?: string | null;
        activeWithExactMatch?: boolean;
        classes?: string | null;
        asLink?: boolean;
        asAllItemsLink?: boolean;
        displayIcon?: boolean;
    }>(),
    {
        activeClasses: null,
        activeWithExactMatch: true,
        classes: null,
        asLink: true,
        asAllItemsLink: false,
        displayIcon: false,
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
    <LocaleLink
        v-if="asLink"
        :target="isExternalLink || linkNewTab ? '_blank' : ''"
        :rel="isExternalLink || linkNewTab ? 'noopener noreferrer nofollow' : ''"
        :aria-label="getTranslatedProperty(navigationElement, 'name')"
        :to="isExternalLink ? externalLink : isInternalLink ? path : getCategoryRoute(navigationElement)"
        :format="!isExternalLink"
        class="transition-all hover:text-brand-primary"
        :class="[classes, isActive(navigationElement.seoUrls, activeWithExactMatch) ? activeClasses : '']"
        @click="trackNavigation(navigationElement.level - 1 ?? 0, getTranslatedProperty(navigationElement, 'name'))"
    >
        <template v-if="asAllItemsLink">
            {{ $t('navigation.sidebar.allItems') }}
        </template>

        <template v-else>
            {{ getTranslatedProperty(navigationElement, 'name') }}
        </template>
    </LocaleLink>

    <div
        v-else
        :class="[classes, isActive(navigationElement.seoUrls) ? activeClasses : '', displayIcon ? 'flex' : '']"
    >
        <span>
            {{ getTranslatedProperty(navigationElement, 'name') }}
        </span>

        <span
            v-if="displayIcon"
            class="ml-auto items-center"
        >
            <FormKitIcon
                class="block h-4 w-4"
                icon="chevron-right"
            />
        </span>
    </div>
</template>
