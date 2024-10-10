<script setup lang="ts">
import type { CmsElementCategoryNavigation } from '@shopware-pwa/composables-next';
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

defineProps<{
    element: CmsElementCategoryNavigation;
}>();

const { navigationElements, loadNavigationElements } = useNavigation();

await loadNavigationElements({ depth: 2 });

const { isActive } = useActivePath();
</script>

<template>
    <ul v-if="navigationElements?.length">
        <li
            v-for="item in navigationElements"
            :key="item.id"
            class="mt-4 border-b border-gray pb-4 pl-2"
        >
            <NuxtLink
                :to="getCategoryRoute(item)"
                class="text-lg"
                :class="{ 'font-bold': isActive(item.seoUrls) }"
            >
                {{ getTranslatedProperty(item, 'name') }}
            </NuxtLink>
            <ul v-if="item.children && item.children.length">
                <li
                    v-for="child in item.children"
                    :key="child.id"
                    class="ml-3 mt-2 text-base"
                >
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
