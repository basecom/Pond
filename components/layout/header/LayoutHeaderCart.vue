<script setup lang="ts">
const { cartItems } = useCart();
</script>

<template>
    <LayoutHeaderCartInner :cart-items="cartItems.length" /></template>
