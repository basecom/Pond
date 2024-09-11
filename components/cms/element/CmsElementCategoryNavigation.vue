<script setup lang="ts">
import type { CmsElementCategoryNavigation } from '@shopware-pwa/composables-next';
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    element: CmsElementCategoryNavigation;
}>();

const { navigationElements, loadNavigationElements } = useNavigation();

await loadNavigationElements({ depth: 2 });

const isActive = (path: Schemas['SeoUrl'][] | undefined, onlyExactMatch: boolean = false) => {
    if (!path) return false;
    const formattedPath = '/' + path[0]?.seoPathInfo;
    const { path: currentPath } = useRoute();
    return onlyExactMatch ? formattedPath === currentPath : currentPath.includes(formattedPath);
}
</script>


<template>
    <ul v-if="navigationElements && navigationElements.length">
        <li class="mt-4 border-b border-gray-300 pb-4 pl-2"
            v-for="item in navigationElements" :key="item.id">
            <NuxtLink
                :to="getCategoryRoute(item)"
                class="text-lg"
                :class="{ 'font-bold': isActive(item.seoUrls) }"
            >
                {{ getTranslatedProperty(item, 'name') }}
            </NuxtLink>
            <ul v-if="item.children && item.children.length">
                <li class="mt-2 ml-3 text-base"
                     v-for="child in item.children" :key="child.id">
                    <NuxtLink
                        :to="getCategoryRoute(child)"
                        :class="{ 'font-bold': isActive(child.seoUrls) }"
                    >
                        {{ getTranslatedProperty(child, 'name') }}
                    </NuxtLink>
                </li>
            </ul>
        </li>
    </ul>
</template>


<style scoped>
</style>
