<script setup lang="ts">
import type { CmsElementCategoryNavigation } from '@shopware-pwa/composables-next';
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

defineProps<{
    element: CmsElementCategoryNavigation;
}>();

const navigationStore = useNavigationStore();
const { mainNavigation } = storeToRefs(navigationStore);

const { isActive } = useActivePath();
</script>

<template>
    <ul>
        <li
            v-for="item in mainNavigation"
            :key="item.id"
            class="mt-4 border-b border-gray pb-4 pl-2"
        >
            <LocaleLink
                :to="getCategoryRoute(item)"
                class="text-lg"
                :class="{ 'font-bold': isActive(item.seoUrls) }"
            >
                {{ getTranslatedProperty(item, 'name') }}
            </LocaleLink>

            <ul v-if="item.children && item.children.length && isActive(item.seoUrls)">
                <li
                    v-for="child in item.children"
                    :key="child.id"
                    class="ml-3 mt-2 text-base"
                >
                    <LocaleLink
                        :to="getCategoryRoute(child)"
                        :class="{ 'font-bold': isActive(child.seoUrls) }"
                    >
                        {{ getTranslatedProperty(child, 'name') }}
                    </LocaleLink>
                </li>
            </ul>
        </li>
    </ul>
</template>
