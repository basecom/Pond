<script setup lang="ts">
const { count: wishlistCount } = useWishlist();
</script>

<template>
    <LocaleLink
        to="/wishlist"
        class="relative h-5"
    >
        <Icon name="mdi:cards-heart-outline" class="size-5" />
        <IndicatorPill class="absolute -right-2 -top-1" :number="wishlistCount" />
    </LocaleLink>
</template>
