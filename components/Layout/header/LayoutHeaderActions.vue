<script setup lang="ts">

import LayoutHeaderAccount from '~/components/Layout/header/LayoutHeaderAccount.vue';
import LayoutHeaderWishlist from '~/components/Layout/header/LayoutHeaderWishlist.vue';
import LayoutHeaderSearch from '~/components/Layout/header/LayoutHeaderSearch.vue';

</script>

<template>
    <div class="flex items-center gap-3.5">
        <!-- search -->
        <LayoutHeaderSearch />

        <!-- wishlist -->
        <LayoutHeaderWishlist />

        <!-- account -->
        <LayoutHeaderAccount />

        <!-- cart -->
        <LayoutHeaderCart />
    </div>
</template>