<script setup lang="ts">
import type { CmsElementCategoryNavigation } from '@shopware-pwa/composables-next';
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    element: CmsElementCategoryNavigation;
}>();

const navigationStore = useNavigationStore();
const { mainNavigationElements } = storeToRefs(navigationStore);

const { status } = useLazyAsyncData(
    'load-main-navigation-' + props.element.id,
    async () => {
        await navigationStore.loadMainNavigation(2);

        return mainNavigationElements.value;
    },
);

const { isActive } = useActivePath();
</script>

<template>
    <template v-if="status === 'pending'">
        <ClientOnly>
            <LayoutSkeletonCmsElementCategoryNavigation />
        </ClientOnly>
    </template>

    <ul v-else>
        <li
            v-for="item in mainNavigationElements"
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
            <ul v-if="item.children && item.children.length">
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
