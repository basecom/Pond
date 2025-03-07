<script setup lang="ts">
withDefaults(
    defineProps<{
      cartItems?: number;
    }>(),
    {
        cartItems: 0,
    },
);
</script>

<template>
    <UiSheet>
        <slot name="cart-trigger">
            <UiSheetTrigger class="size-5">
                <slot name="cart-icon">
                    <Icon name="mdi:cart-outline" class="size-5" />
                </slot>

                <slot name="cart-badge">
                    <UiBadge v-if="cartItems > 0" class="absolute -right-2 -top-1.5 px-1 py-0 text-xs font-normal">
                        {{ cartItems }}
                    </UiBadge>
                </slot>
            </UiSheetTrigger>
        </slot>

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
