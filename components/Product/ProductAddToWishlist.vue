<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
        product: Schemas['Product'];
        layout?: 'standard' | 'minimal';
    }>(),
    {
        layout: 'standard',
    },
);

const { isInWishlist, addToWishlist, removeFromWishlist } = useProductWishlist(props.product.id);
const { trackAddToWishlist, trackRemoveFromWishlist } = useAnalytics();
const { pushSuccess, pushError } = useNotifications();
const { t } = useI18n();

const handleWishlistButtonClicked = async () => {
    if (isInWishlist.value) {
        try {
            await removeFromWishlist();
            trackRemoveFromWishlist(props.product);
            pushSuccess(t('wishlist.removedSuccessfully'));
        } catch (error) {
            pushError(t('wishlist.errorRemovingProduct'));
        }
    } else {
        try {
            await addToWishlist();
            trackAddToWishlist(props.product);
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
            class="block size-6"
            :icon="isInWishlist ? 'heart' : 'empty-heart'"
            :title="isInWishlist ? t('icon.removeFromWishlist') : t('icon.addToWishlist')"
        />
    </div>
</template>
