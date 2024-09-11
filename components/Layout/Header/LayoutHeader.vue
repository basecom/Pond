<script setup lang="ts">
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { Schemas } from '@shopware/api-client/api-types';
import LayoutHeaderActions from '~/components/Layout/header/LayoutHeaderActions.vue';

const customerStore = useCustomerStore();
const { loadNavigationElements, navigationElements } = useNavigation();
const { loading } = storeToRefs(customerStore);
const sideMenuController = useModal();

await loadNavigationElements({ depth: 2 });
const currentMouseoverMenu: Ref<null | string> = ref(null);

const isActive = (path: Schemas['SeoUrl'][] | null) => {
    if (!path) return false;

    const formattedPath = '/' + path[0]?.seoPathInfo;
    const { path: currentPath } = useRoute();
    return currentPath.includes(formattedPath);
};
</script>

<template>
    <header
        v-show="!loading"
        class="sticky top-0 z-10 bg-gray-light md:bg-white"
    >
        <div class="container relative z-10 py-3 md:py-6">
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-3">
                    <!-- mobile menu -->
                    <FormKitIcon
                        icon="bars"
                        class="w-4 cursor-pointer md:hidden"
                        @click="sideMenuController.open()"
                    />
                    <LazyLayoutSidebar
                        v-if="sideMenuController.isOpen"
                        :controller="sideMenuController"
                    >
                        <div class="grid gap-2 md:hidden">
                            <template
                                v-for="navigationElement in navigationElements"
                                :key="navigationElement.id"
                            >
                                <NuxtLink
                                    :target="
                                        navigationElement.externalLink || navigationElement.linkNewTab ? '_blank' : ''
                                    "
                                    :rel="
                                        navigationElement.externalLink || navigationElement.linkNewTab
                                            ? 'noopener noreferrer nofollow'
                                            : ''
                                    "
                                    :aria-label="getTranslatedProperty(navigationElement, 'name')"
                                    :to="getCategoryRoute(navigationElement)"
                                    class="border-b-2 border-gray-light py-3 md:min-w-max md:border-0 md:pb-2"
                                    :class="{
                                        'font-bold md:border-b-2 md:border-brand-primary':
                                            getTranslatedProperty(navigationElement, 'name') == 'Gift cards' ||
                                            isActive(navigationElement.seoUrls),
                                    }"
                                >
                                    {{ getTranslatedProperty(navigationElement, 'name') }}
                                </NuxtLink>
                            </template>
                        </div>
                    </LazyLayoutSidebar>

                    <LayoutLogo logo-classes="w-36 md:w-40" />
                </div>

                <LayoutHeaderActions />
            </div>
        </div>

        <div class="relative hidden w-screen md:block md:bg-gray-light">
            <div class="container flex gap-8 overflow-x-scroll py-4">
                <div
                    v-for="navigationElement in navigationElements"
                    :key="navigationElement.id"
                    class="min-w-max"
                >
                    <NuxtLink
                        :target="navigationElement.externalLink || navigationElement.linkNewTab ? '_blank' : ''"
                        :rel="
                            navigationElement.externalLink || navigationElement.linkNewTab
                                ? 'noopener noreferrer nofollow'
                                : ''
                        "
                        :aria-label="getTranslatedProperty(navigationElement, 'name')"
                        :to="getCategoryRoute(navigationElement)"
                        class="text-neutral-black py-4 transition-all hover:text-brand-primary"
                        :class="{
                            'border-b-2 border-brand-primary font-bold': isActive(navigationElement.seoUrls),
                        }"
                        @click="currentMouseoverMenu = null"
                    >
                        {{ getTranslatedProperty(navigationElement, 'name') }}
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div id="searchContainer"></div>
    </header>
</template>
