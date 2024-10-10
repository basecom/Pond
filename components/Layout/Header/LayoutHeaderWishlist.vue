<script setup lang="ts">
const { count: wishlistCount } = useWishlist();
</script>

<template>
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
</template>
