<script setup lang="ts">
const { count: wishlistItems } = useWishlist();
</script>

<template>
    <LayoutHeaderWishlistInner :wishlist-items="wishlistItems" />
</template>
