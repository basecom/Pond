<script setup lang="ts">
const configStore = useConfigStore();
const wishlistEnabled = configStore.get('core.cart.wishlistEnabled');
</script>

<template>
    <div class="flex items-center gap-3.5">
        <LayoutHeaderWishlist v-if="wishlistEnabled" />
        <LayoutHeaderAccount />
        <LayoutHeaderCart />
    </div>
</template>
