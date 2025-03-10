<script setup lang="ts">
const contextStore = useContextStore();
const { loading } = storeToRefs(contextStore);

const { refreshCart } = useCart();
const { getWishlistProducts } = useWishlist();

contextStore.refreshSessionContext();
refreshCart();

getWishlistProducts();
</script>

<template>
    <UtilityLoadingSpinner v-if="loading" />

    <LayoutHeader v-show="!loading" />

    <main
        v-show="!loading"
        class="container mt-4 flex flex-col items-center justify-center md:mt-10"
    >
        <slot />
    </main>

    <LayoutFooter v-show="!loading" />
    <CookieBanner />
</template>
