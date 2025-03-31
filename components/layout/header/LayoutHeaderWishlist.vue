<script setup lang="ts">
const { count } = useWishlist();
</script>

<template>
    <LayoutHeaderWishlistInner :wishlist-items-count="count" />
</template>
