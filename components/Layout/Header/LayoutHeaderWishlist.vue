<script setup lang="ts">
const { count: wishlistCount } = useWishlist();
const configStore = useConfigStore();
const wishlistEnabled = configStore.get('core.cart.wishlistEnabled');
</script>

<template>
    <NuxtLink
        v-if="wishlistEnabled"
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
