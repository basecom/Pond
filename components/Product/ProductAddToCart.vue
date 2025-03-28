<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      product: Schemas['Product'];
      icon?: boolean;
      label?: boolean;
    }>(),
    {
        icon: true,
        label: true,
    },
);

const { product } = useProduct(props.product);
const { addToCart, quantity } = useAddToCart(product);
const { trackAddToCart } = useAnalytics();
const { t } = useI18n();
const { pushError, pushSuccess } = useNotifications();

quantity.value = product.value.minPurchase;

const handleAddToCart = async () => {
    try {
        const quantityNumber = quantity.value ?? 1;
        await addToCart();
        trackAddToCart(product.value, quantityNumber);
        quantity.value = product.value.minPurchase;

        pushSuccess(t('product.addToCart.successMessage', { productName: product.value.translated.name }));
    } catch (error) {
        pushError(t('product.addToCart.errorMessage', { productName: product.value.translated.name }));
    }
};
</script>

<template>
    <div class="p-4 pt-0">
        <FormKit
            v-if="product.availableStock > 0"
            type="form"
            :actions="false"
            :classes="{
                form: 'w-full flex gap-4',
                outer: 'w-20',
            }"
            @keydown.enter.prevent
            @submit="handleAddToCart"
        >
            <SharedQuantityInput
                v-model="quantity"
                :min-purchase="product.minPurchase"
                :max-purchase="product.maxPurchase"
                :steps="product.purchaseSteps"
                @on-enter="handleAddToCart"
            />

            <FormKit
                type="submit"
                :classes="{
                    outer: 'w-full',
                }"
                :label="props.label ? $t('product.addToCart.submitLabel') : ' '"
                :prefix-icon="props.icon ? 'cart-shopping' : ''"
            />
        </FormKit>

        <div
            v-else
            class="flex w-full items-center gap-1 rounded bg-gray-light px-4 py-2 text-sm text-gray"
        >
            <FormKitIcon
                icon="info"
                :title="t('icon.info')"
                class="block size-3.5"
            />
            <span>{{ $t('product.addToCart.notAvailable') }}</span>
        </div>
    </div>
</template>
