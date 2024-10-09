<script setup lang="ts">
const { count: wishlistCount } = useWishlist();
const { getWishlistProducts } = useWishlist();

onMounted(() => {
    const route = useRoute();
    if (route.path !== '/wishlist') {
        // If not on wishlist page we fetch for displaying the amount of items in the header
        getWishlistProducts();
    }
});
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
