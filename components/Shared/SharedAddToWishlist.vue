<template>
    <div class="p-2 cursor-pointer select-none" @click="handleWishlistButtonClicked">
        <FormKitIcon
            class="block h-6 w-6 text-red-500"
            :icon = "isInWishlist ? 'heart' : 'empty-heart'"
        />
    </div>
</template>
<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
        productId: Schemas['Product']['id'];
        layout?: 'standard' | 'minimal';
    }>(),
    {
        layout: 'standard',
    },
);

const { isInWishlist, addToWishlist, removeFromWishlist } = useProductWishlist(props.productId);
const { pushSuccess, pushError, pushInfo } = useNotifications();

const handleWishlistButtonClicked = async () =>{
    if(isInWishlist.value){
        try {
            await removeFromWishlist();
            pushInfo("product removed from whishlist")
        } catch (error) {
            pushError("error while removing product from whishlist")
        }
        
    }
    else{
        try {
            await addToWishlist();
            pushSuccess("product added to whislist")
        } catch (error) {
            pushSuccess("error while adding product to whishlist")
        }
    }
}
</script>