<script setup lang="ts">
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const customerStore = useCustomerStore();
const { loading, signedIn } = storeToRefs(customerStore);
const sideMenuController = useModal();
const offcanvasCartController = useModal();
const modalController = useModal();
const { count: wishlistCount } = useWishlist();
const { cartItems } = useCart();
const { getCartItemsCount } = useCartItems();

const searchComponent = ref(null);
const toggleSearch = ref(null);
const searchVisible = ref(false);

const cartItemCount = computed(() => getCartItemsCount(cartItems.value));

onClickOutside(searchComponent, event => {
    if (event.target !== toggleSearch.value) {
        searchVisible.value = false;
    }
});
</script>

<template>
    <header
        v-show="!loading"
        class="sticky top-0 z-10 bg-gray-light md:bg-white h-fit"
    >
        <div class="container relative z-10 py-3 md:py-6">
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-3">
                    <!-- mobile menu -->
<!--                    <FormKitIcon-->
<!--                        icon="bars"-->
<!--                        class="w-4 cursor-pointer md:hidden"-->
<!--                        @click="sideMenuController.open()"-->
<!--                    />-->
<!--                    <LazyLayoutSidebar-->
<!--                        v-if="sideMenuController.isOpen"-->
<!--                        :controller="sideMenuController"-->
<!--                    >-->
<!--                        <div class="grid gap-2 md:hidden">-->
<!--                            <template-->
<!--                                v-for="navigationElement in navigationElements"-->
<!--                                :key="navigationElement.id"-->
<!--                            >-->
<!--                                <NuxtLink-->
<!--                                    :target="-->
<!--                                        navigationElement.externalLink || navigationElement.linkNewTab ? '_blank' : ''-->
<!--                                    "-->
<!--                                    :rel="-->
<!--                                        navigationElement.externalLink || navigationElement.linkNewTab-->
<!--                                            ? 'noopener noreferrer nofollow'-->
<!--                                            : ''-->
<!--                                    "-->
<!--                                    :aria-label="getTranslatedProperty(navigationElement, 'name')"-->
<!--                                    :to="getCategoryRoute(navigationElement)"-->
<!--                                    class="border-b-2 border-gray-light py-3 md:min-w-max md:border-0 md:pb-2"-->
<!--                                >-->
<!--&lt;!&ndash;                                    :class="{&ndash;&gt;-->
<!--&lt;!&ndash;                                        'font-bold md:border-b-2 md:border-brand-primary':&ndash;&gt;-->
<!--&lt;!&ndash;                                            getTranslatedProperty(navigationElement, 'name') == 'Gift cards' ||&ndash;&gt;-->
<!--&lt;!&ndash;                                            isActive(navigationElement.seoUrls),&ndash;&gt;-->
<!--&lt;!&ndash;                                    }"&ndash;&gt;-->
<!--                                    {{ getTranslatedProperty(navigationElement, 'name') }}-->
<!--                                </NuxtLink>-->
<!--                            </template>-->
<!--                        </div>-->
<!--                    </LazyLayoutSidebar>-->

                    <LayoutLogo logo-classes="w-36 md:w-40" />
                </div>

                <div class="flex items-center gap-3.5">
                    <!-- search -->
                    <button
                        ref="toggleSearch"
                        @click="searchVisible = !searchVisible"
                    >
                        <FormKitIcon
                            class="pointer-events-none block h-6 w-6"
                            icon="search"
                        />
                    </button>

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
                        :with-close-button="true"
                    >
                        <template #trigger>
                            <FormKitIcon
                                class="block h-6 w-6"
                                icon="user"
                            />
                        </template>
                        <template #title>Login</template>
                        <template #content>
                            <AccountLoginRegisterTabs />
                        </template>
                    </LazySharedModal>
                    <LazySharedPopover v-else>
                        <template #trigger>
                            <FormKitIcon
                                class="block h-6 w-6"
                                icon="user"
                                @click="!signedIn ? modalController.open() : null"
                            />
                        </template>
                        <template #content>
                            <div class="py-2 first:pt-0">
                                <NuxtLink to="/account">account</NuxtLink>
                            </div>
                            <FormKit
                                type="submit"
                                prefix-icon="right-from-bracket"
                                @click.prevent="customerStore.logout()"
                            >
                                logout
                            </FormKit>
                        </template>
                    </LazySharedPopover>

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

                        <NuxtLink
                            to="/checkout/cart"
                            class="mt-4 flex items-center justify-center rounded-md bg-brand-primary px-6 py-3 text-white"
                            @click="offcanvasCartController.close()"
                        >
                            to the cart
                        </NuxtLink>
                    </LazyLayoutSidebar>
                </div>
            </div>
        </div>

        <LayoutNavigation/>
<!--        <div class="relative hidden w-screen md:block md:bg-gray-light">-->
<!--            <div class="container flex gap-8 overflow-x-scroll py-4">-->
<!--                <LayoutNavigationItem-->
<!--                    v-for="navigationElement in navigationElements"-->
<!--                    :key="navigationElement.id"-->
<!--                    :navigation-element="navigationElement"-->
<!--                />-->
<!--            </div>-->
<!--        </div>-->

        <LayoutSearch
            v-if="searchVisible"
            ref="searchComponent"
            @close-search="searchVisible = false"
        />
        <div id="flyouts"></div>
    </header>
</template>
