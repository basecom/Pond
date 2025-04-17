<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import UiButton from "../../ui/button/UiButton.vue";

const props = withDefaults(
    defineProps<{
      cartItems?: Schemas['LineItem'][];
    }>(),
    {
        cartItems: undefined,
    },
);

const hasLineItems = () => props.cartItems && props.cartItems?.length > 0;
</script>

<template>
    <UiSheet>
        <slot name="cart-trigger">
            <UiSheetTrigger class="size-5">
                <slot name="cart-icon">
                    <Icon name="mdi:cart-outline" class="size-5" />
                </slot>

                <slot name="cart-badge">
                    <UiBadge v-if="hasLineItems()" class="absolute -right-2 -top-1.5 px-1 py-0 text-xs font-normal">
                        {{ cartItems.length }}
                    </UiBadge>
                </slot>
            </UiSheetTrigger>
        </slot>

        <UiSheetContent>
            <UiSheetHeader>
                <UiSheetTitle>Cart</UiSheetTitle>
                <UiSheetDescription>
                    <template v-if="hasLineItems()">

                    </template>
                  <template v-else>

                  </template>
                  <div class="flex flex-col">
                    <div class="text-center"><a href="/"><UiButton variant="link">{{$t('proceedToCheckout')}}</UiButton></a></div>
                    <div class="text-center"><a href="/"><UiButton variant="link">{{$t('proceedToCart')}}</UiButton></a></div>

                  </div>
                </UiSheetDescription>
            </UiSheetHeader>
        </UiSheetContent>
    </UiSheet>
</template>
