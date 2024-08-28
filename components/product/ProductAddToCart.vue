<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';
import type { ResolvedApiError } from '~/types/errors';
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    product: Schemas['Product'];
    icon?: boolean;
    label?: boolean;
}>();

const { product } = useProduct(props.product);
const { addToCart, quantity } = useAddToCart(product);
quantity.value = product.value.minPurchase;
const { resolveApiErrors } = useApiErrorsResolver();
const { pushError, pushSuccess } = useNotifications();
const apiErrors = ref<ResolvedApiError[]>([]);

const handleEnter = async $event => {
    if ($event.target !== null) {
        // remove focus from input to trigger quantity update
        $event.target.blur();
    }

    await handleAddToCart();
};

const handleAddToCart = async () => {
    try {
        await addToCart();
        quantity.value = product.value.minPurchase;

        pushSuccess(product.value.translated.name + ' was added to your cart.');
    } catch (error) {
        pushError('An error occured trying to add ' + product.value.translated.name + ' to your cart.');

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
            :label="props.label ? 'add to cart' : ' '"
            :prefix-icon="props.icon ? 'cart-shopping' : ''"
        />
    </FormKit>

    <div
        v-else
        class="flex w-full gap-1 rounded bg-gray-light px-4 py-2 text-gray"
    >
        <FormKitIcon
            icon="info"
            class="block h-5 w-5"
        />
        <span> product currently not available </span>
    </div>
</template>
