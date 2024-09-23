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
const { t } = useI18n();

const handleWishlistButtonClicked = async () =>{
    if(isInWishlist.value){
        try {
            await removeFromWishlist();
            pushInfo( t('wishlist.removedSuccesfully'))
        } catch (error) {
            pushError(t('wishlist.errorRemovingProduct'))
        }
        
    }
    else{
        try {
            await addToWishlist();
            pushSuccess( t('wishlist.addedSuccesfully'))
        } catch (error) {
            pushSuccess(t('wishlist.errorAddingProduct'))
        }
    }
}
</script>
<template>
    <div class="p-2 cursor-pointer select-none" @click="handleWishlistButtonClicked">
        <FormKitIcon
            class="block h-6 w-6 text-red-500"
            :icon = "isInWishlist ? 'heart' : 'empty-heart'"
        />
    </div>
</template>