<script setup lang="ts">
const configStore = useConfigStore();
const wishlistEnabled = configStore.get('core.cart.wishlistEnabled') as boolean;
</script>

<template>
    <LayoutHeaderActionsInner :wishlist-enabled="wishlistEnabled" />
</template>
