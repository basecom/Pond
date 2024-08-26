<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';
import type { ResolvedApiError } from '~/types/errors';
import type { Schemas } from '@shopware/api-client/api-types';

type FormkitQuantityFields = {
    quantity: string;
};

const props = defineProps<{
    product: Schemas['Product'];
}>();

const { product } = useProduct(props.product);
const { addToCart, quantity } = useAddToCart(product);
const { resolveApiErrors } = useApiErrorsResolver();
const { pushError, pushSuccess } = useNotifications();
const apiErrors = ref<ResolvedApiError[]>([]);

const handleAddToCart = async (fields: FormkitQuantityFields) => {
    quantity.value = parseInt(fields['quantity']) ?? 1;
    try {
        await addToCart();

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
        submit-label="add to cart"
        :classes="{
            form: 'w-full flex gap-4',
            actions: 'flex-grow',
            outer: 'w-20',
        }"
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
        <FormKit
            type="number"
            name="quantity"
            :step="product.purchaseSteps"
            :min="product.purchaseUnit"
            :max="product.availableStock"
            :value="product.purchaseUnit"
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
