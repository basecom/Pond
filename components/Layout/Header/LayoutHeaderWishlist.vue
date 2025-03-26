<script setup lang="ts">
const { count: wishlistCount } = useWishlist();
</script>

<template>
    <LocaleLink
        to="/wishlist"
        class="relative"
    >
        <FormKitIcon
            class="block size-6"
            icon="heart"
            title="Wishlist"
        />
        <UtilityPill
            :number="wishlistCount"
            class="absolute bottom-2.5 left-3"
        />
    </LocaleLink>
</template>
