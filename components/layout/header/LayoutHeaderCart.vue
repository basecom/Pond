<script setup lang="ts">
const { cartItems } = useCart();
</script>

<template>
    <UiSheet>
        <UiSheetTrigger class="size-5">
            <Icon name="mdi:cart-outline" class="size-5" />
            <UiBadge v-if="cartItems.length > 0" class="absolute -right-2 -top-1.5 px-1 py-0 text-xs font-normal">
                {{ cartItems.length }}
            </UiBadge>
        </UiSheetTrigger>

        <UiSheetContent>
            <UiSheetHeader>
                <UiSheetTitle>Cart</UiSheetTitle>
                <UiSheetDescription>
                    products
                </UiSheetDescription>
            </UiSheetHeader>
        </UiSheetContent>
    </UiSheet>
</template>
