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
const { pushSuccess, pushError } = useNotifications();
const { t } = useI18n();

const handleWishlistButtonClicked = async () => {
    if (isInWishlist.value) {
        try {
            await removeFromWishlist();
            pushSuccess(t('wishlist.removedSuccessfully'));
        } catch (error) {
            pushError(t('wishlist.errorRemovingProduct'));
        }
    } else {
        try {
            await addToWishlist();
            pushSuccess(t('wishlist.addedSuccessfully'));
        } catch (error) {
            pushError(t('wishlist.errorAddingProduct'));
        }
    }
};
</script>

<template>
    <div
        class="cursor-pointer select-none p-2"
        @click="handleWishlistButtonClicked"
    >
        <FormKitIcon
            class="block h-6 w-6"
            :icon="isInWishlist ? 'heart' : 'empty-heart'"
        />
    </div>
</template>
