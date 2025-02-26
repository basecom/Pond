<script setup lang="ts">
const { count: wishlistCount } = useWishlist();
</script>

<template>
  <LocaleLink
      to="/wishlist"
      class="relative"
  >
    heart
  </LocaleLink>
</template>