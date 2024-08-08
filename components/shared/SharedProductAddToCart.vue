<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';
import type { ResolvedApiError } from '~/types/errors';
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
  product: Schemas['Product'];
}>();
const { product } = useProduct(props.product)

const { addToCart, quantity } = useAddToCart(product);
const { resolveApiErrors } = useApiErrorsResolver();
const apiErrors = ref<ResolvedApiError[]>([]);

const handleAddToCart = async (fields) => {
  quantity.value = parseInt(fields['quantity']) ?? 1;
  try {
    await addToCart();
  } catch (error) {
    if (error instanceof ApiClientError) {
      apiErrors.value = resolveApiErrors(error.details.errors, 'product');
      return;
    }

    apiErrors.value.push({ key: 'product', code: 'PRODUCT_ADD_TO_CART_GENERAL_ERROR' });
  }
}

// const inputQuantity = ref(product.value.purchaseUnit)
// const decreaseQuantity = (inputEL) => {
//   const attrs = inputEL.props.attrs
//   if (inputQuantity.value > attrs.min) {
//     inputQuantity.value = inputQuantity.value - attrs.step;
//     console.log(inputQuantity.value);
//     inputEL.value = inputQuantity.value;
//   }
//   // console.log(attrs);
// }

// const increaseQuantity = (inputEL) => {
//   const attrs = inputEL.props.attrs
//   console.log(inputEL);
//   if (inputQuantity.value < attrs.max) {
//     inputQuantity.value = inputQuantity.value + attrs.step;
//     console.log(inputQuantity.value);
//     inputEL.value = inputQuantity.value;
//   }
//   // console.log(inputEL);
// }
</script>

<template>

  <FormKit
    type="form"
    submit-label="add to cart"
    :classes="{
        form: 'w-full flex gap-4',
        actions: 'flex-grow',
        outer: 'w-20'
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
    <!--
      problem with plus minus buttons is, formkit does not support setting values from code / refs
      possible solutions?
        - ask jordon for idea
        - custom input with radix ui
     -->
    <!--    <FormKit
          type="number"
          name="quantity"
          :step="product.purchaseSteps"
          :min="product.purchaseUnit"
          :max="product.availableStock"
          :value="inputQuantity"
          prefix-icon="minus"
          suffix-icon="plus"
          @prefix-icon-click="decreaseQuantity"
          @suffix-icon-click="increaseQuantity"
        />-->
  </FormKit>
</template>

<style scoped>

</style>