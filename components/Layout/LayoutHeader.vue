<script setup lang="ts">
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { Schemas } from '@shopware/api-client/api-types';

const customerStore = useCustomerStore();
const { loadNavigationElements, navigationElements } = useNavigation();
const { loading, signedIn } = storeToRefs(customerStore);
const sideMenuController = useModal();
const offcanvasCartController = useModal();
const { count: wishlistCount } = useWishlist();
const { cartItems } = useCart();
const { getCartItemsCount } = useCartItems();
const modalController = useModal();

const cartItemCount = computed(() => getCartItemsCount(cartItems.value));
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
        <div class="container py-3 md:py-6 z-10 relative">
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

                <div class="flex items-center gap-3">
                    <!-- wishlist -->
                    <NuxtLink
                        to="/wishlist"
                        class="relative"
                    >
                        <FormKitIcon
                            class="block h-6 w-6"
                            icon="heart"
                        />
                        <UtilityPill
                            :number="wishlistCount"
                            class="absolute bottom-2.5 left-3"
                        />
                    </NuxtLink>

                    <!-- account -->
                    <LazySharedModal
                        v-if="!signedIn"
                        :controller="modalController"
                        :with-close-button="true"
                    >
                        <template #title>Login</template>
                        <template #content>
                            <AccountLogin />
                        </template>
                    </LazySharedModal>
                    <PopoverRoot>
                        <PopoverTrigger
                            class="w-8 h-8 inline-flex items-center justify-center none"
                            aria-label="Update dimensions"
                        >
                            <!-- icon in header -->
                            <FormKitIcon
                                class="block h-6 w-6"
                                icon="user"
                                @click="!signedIn ? modalController.open(): null"
                            />
                        </PopoverTrigger>
                        <PopoverContent
                            v-if="signedIn"
                            side="bottom"
                            :side-offset="5"
                            class="rounded p-4 w-64 bg-white shadow-md border border-gray-light"
                        >
                            <div class="py-2 first:pt-0">
                                <NuxtLink
                                    to="/account"
                                >
                                    account
                                </NuxtLink>
                            </div>
                            <FormKit
                                type="submit"
                                prefix-icon="right-from-bracket"
                                @click.prevent="customerStore.logout()"
                            >
                                logout
                            </FormKit>
                            <PopoverClose
                                class="rounded-full h-6 w-6 inline-flex items-center justify-center absolute top-1 right-1"
                                aria-label="Close"
                            >
                                <FormKitIcon
                                    class="block h-4 w-4 text-gray"
                                    icon="x"
                                />
                            </PopoverClose>
                            <PopoverArrow class="fill-white" />
                        </PopoverContent>
                    </PopoverRoot>

                    <!-- cart -->
                    <button
                        class="relative"
                        @click="offcanvasCartController.open()"
                    >
                        <FormKitIcon
                            icon="cart-shopping"
                            class="block h-6 w-6"
                        />
                        <UtilityPill
                            :number="cartItemCount"
                            class="absolute bottom-2.5 left-3"
                        />
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
                            'border-b-2 border-brand-primary font-bold':
                                isActive(navigationElement.seoUrls) ||
                                getTranslatedProperty(navigationElement, 'name') == 'Make-up',
                        }"
                        @click="currentMouseoverMenu = null"
                    >
                        {{ getTranslatedProperty(navigationElement, 'name') }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </header>
</template>
