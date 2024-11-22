<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';
import type { ResolvedApiError } from '~/types/errors';
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
quantity.value = product.value.minPurchase;
const { resolveApiErrors } = useApiErrorsResolver();
const { pushError, pushSuccess } = useNotifications();
const apiErrors = ref<ResolvedApiError[]>([]);
const { t } = useI18n();

const handleEnter = async $event => {
    if ($event.target !== null) {
        // remove focus from input to trigger quantity update
        $event.target.blur();
    }

    await handleAddToCart();
};

const handleAddToCart = async () => {
    try {
        const quantityNumber = quantity.value ?? 1;
        await addToCart();
        trackAddToCart(product.value, quantityNumber);
        quantity.value = product.value.minPurchase;

        pushSuccess(t('product.addToCart.successMessage', { productName: product.value.translated.name }));
    } catch (error) {
        pushError(t('product.addToCart.errorMessage', { productName: product.value.translated.name }));

        if (error instanceof ApiClientError) {
            apiErrors.value = resolveApiErrors(error.details.errors, 'product');
            return;
        }

        apiErrors.value.push({ key: 'product', code: 'PRODUCT_ADD_TO_CART_GENERAL_ERROR' });
    }
};
</script>

<template>
    <FormKit
        v-if="product.availableStock > 0"
        type="form"
        :name="`add_to_cart_${product.id}`"
        :actions="false"
        :classes="{
            form: 'w-full flex gap-4',
            outer: 'w-20',
        }"
        @keydown.enter.prevent
        @submit="handleAddToCart"
    >
        <ul
            v-if="apiErrors.length"
            class="validation-errors text-status-danger"
        >
            <li
                v-for="(error, index) in apiErrors"
                :key="`product-error-${index}`"
            >
                {{ error.code }}
            </li>
        </ul>

        <SharedQuantityInput
            v-model="quantity"
            :product="product"
            @on-enter="handleEnter($event)"
        />

        <FormKit
            type="submit"
            :classes="{
                outer: 'w-full',
            }"
            :label="label ? $t('product.addToCart.submitLabel') : ' '"
            :prefix-icon="icon ? 'cart-shopping' : null"
        />
    </FormKit>

    <div
        v-else
        class="flex w-full gap-1 rounded bg-gray-light px-4 py-2 text-sm text-gray"
    >
        <FormKitIcon
            icon="info"
            class="block h-5 w-5"
        />
        <span>{{ $t('product.addToCart.notAvailable') }}</span>
    </div>
</template>
