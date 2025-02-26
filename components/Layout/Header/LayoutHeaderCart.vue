<script setup lang="ts">
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {Badge} from '~/components/ui/badge';

const { cartItems } = useCart();
</script>

<template>
    <Sheet>
        <SheetTrigger class="size-5">
            <Icon name="mdi:cart-outline" class="size-5" />
            <Badge v-if="cartItems.length > 0" class="absolute -right-2 -top-1.5 px-1 py-0 text-xs font-normal">
                {{ cartItems.length }}
            </Badge>
        </SheetTrigger>

        <SheetContent>
            <SheetHeader>
                <SheetTitle>Cart</SheetTitle>
                <SheetDescription>
                    products
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
</template>
