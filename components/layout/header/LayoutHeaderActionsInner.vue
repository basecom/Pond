<script setup lang="ts">
withDefaults(
    defineProps<{
      wishlistEnabled?: boolean;
    }>(),
    {
        wishlistEnabled: false,
    },
);
</script>

<template>
    <slot name="wrapper">
        <div class="flex items-center gap-3.5">
            <slot name="search">
                <LayoutHeaderSearch />
            </slot>

            <slot name="wishlist">
                <LayoutHeaderWishlist v-if="wishlistEnabled" />
            </slot>

            <slot name="account">
                <LayoutHeaderAccount />
            </slot>

            <slot name="cart">
                <LayoutHeaderCart />
            </slot>
        </div>
    </slot>
</template>
