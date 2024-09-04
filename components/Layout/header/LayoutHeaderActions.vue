<script setup lang="ts">

const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);
const { cartItems, isEmpty } = useCart();
const { getCartItemsCount } = useCartItems();
const offcanvasCartController = useModal();
const modalController = useModal();
const { count: wishlistCount } = useWishlist();
const cartItemCount = computed(() => getCartItemsCount(cartItems.value));
const searchVisible = ref(false);

const searchComponent = ref(null);
const toggleSearch = ref(null);

onClickOutside(searchComponent, event => {
    if (event.target !== toggleSearch.value) {
        searchVisible.value = false;
    }
});
</script>

<template>
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
            <div v-if="!isEmpty">
                <ul class="divide-y divide-gray-medium border-t border-gray-medium pb-4">
                    <li
                        v-for="cartItem in cartItems"
                        :key="cartItem.id"
                        class="flex py-6"
                    >
                        <CheckoutLineItem :line-item="cartItem" />
                    </li>
                </ul>
                <CheckoutSummary :reduced-display="true" />
            </div>

            <NuxtLink
                to="/checkout/cart"
                class="mt-4 flex items-center justify-center rounded-md bg-brand-primary px-6 py-3 text-white"
                @click="offcanvasCartController.close()"
            >
                to the cart
            </NuxtLink>
        </LazyLayoutSidebar>
    </div>

    <LayoutSearch
        v-if="searchVisible"
        ref="searchComponent"
        @close-search="searchVisible = false"
    />
</template>

<style scoped>

</style>