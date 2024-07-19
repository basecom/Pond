<script setup lang="ts">
import LayoutSearch from '~/components/Layout/LayoutSearch.vue';
import UtilityIcon from '~/components/Utility/UtilityIcon.vue';
import LayoutNavigationItems from '~/components/Layout/Navigation/LayoutNavigationItems.vue';
import UtilityPill from '~/components/Utility/UtilityPill.vue';
import { useCartItems } from '~/composables/useCartItems';
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { SeoUrl } from '@shopware-pwa/types';
import type { Ref } from 'vue';

const customerStore = useCustomerStore();
const { loadNavigationElements, navigationElements } = useNavigation();
const { loading } = storeToRefs(customerStore);
const sideMenuController = useModal();
const offcanvasCartController = useModal();
const { count: wishlistCount } = useWishlist();
const { cartItems } = useCart();
const { getCartItemsCount } = useCartItems();

const cartItemCount = computed(() => getCartItemsCount(cartItems.value));
customerStore.refreshContext();
await loadNavigationElements({ depth: 2 });
const currentMouseoverMenu: Ref<null | string> = ref(null);

const isActive = (path: SeoUrl[] | null) => {
    if (!path) return false;

    const formattedPath = '/' + path[0]?.seoPathInfo;
    const { path: currentPath } = useRoute();
    return currentPath.includes(formattedPath);
};
</script>

<template>
    <header v-show="!loading" class="border-neutral-ash sticky top-0 border-b-2 bg-white">
        <div class="container py-3 md:pb-0 md:pt-6">
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-3">
                    <!-- mobile menu -->
                    <UtilityIcon class="w-4 cursor-pointer md:hidden" icon="bars" @click="sideMenuController.open()" />
                    <LazyLayoutSidebar v-if="sideMenuController.isOpen" :controller="sideMenuController">
                        <div class="grid gap-2 md:hidden">
                            <LayoutNavigationItems :navigation-elements="navigationElements" />
                        </div>
                    </LazyLayoutSidebar>

                    <!-- search -->
                    <LayoutSearch />
                </div>

                <LayoutLogo logo-classes="w-36 md:w-40" />

                <div class="flex items-center gap-3">
                    <!-- wishlist -->
                    <NuxtLink to="/wishlist" class="relative">
                        <UtilityIcon icon="heart" />
                        <UtilityPill :number="wishlistCount" class="absolute bottom-2.5 left-3" />
                    </NuxtLink>

                    <!-- cart -->
                    <button class="relative" @click="offcanvasCartController.open()">
                        <UtilityIcon icon="cart-shopping" />
                        <UtilityPill :number="cartItemCount" class="absolute bottom-2.5 left-3" />
                    </button>
                    <LazyLayoutSidebar
                        v-if="offcanvasCartController.isOpen"
                        :controller="offcanvasCartController"
                        side="right"
                    >
                        offcanvas cart
                    </LazyLayoutSidebar>
                </div>
            </div>

            <div class="relative flex gap-2">
                <div
                    v-for="navigationElement in navigationElements"
                    :key="navigationElement.id"
                    class="shrink-0 snap-center"
                    @mouseover="currentMouseoverMenu = navigationElement.id"
                    @mouseleave="currentMouseoverMenu = null"
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
                        class="text-neutral-black hover:border-neutral-black mr-5 inline-block border-b border-white pb-3 transition-all lg:mr-8 lg:py-4"
                        :class="{
                            '!border-neutral-black font-medium': isActive(navigationElement.seoUrls),
                        }"
                        @click="currentMouseoverMenu = null"
                    >
                        {{ getTranslatedProperty(navigationElement, 'name') }}
                    </NuxtLink>

                    <client-only>
                        <LayoutNavigationFlyout
                            v-if="
                                navigationElement.children &&
                                navigationElement.children?.length > 0 &&
                                navigationElement.id === currentMouseoverMenu
                            "
                            :navigation-element="navigationElement"
                            @close-flyout="() => (currentMouseoverMenu = null)"
                        />
                    </client-only>
                </div>
            </div>
        </div>
    </header>
</template>
