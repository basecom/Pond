<script setup lang="ts">
import type { CmsElementBuyBox } from '@shopware-pwa/composables-next';
import SharedProductAddToCart from '~/components/shared/SharedProductAddToCart.vue';
const { sessionContext } = useSessionContext();

const props = defineProps<{
  element: CmsElementBuyBox;
}>();
const { product } = useProduct(props.element.data.product)

</script>

<template>
<div class="flex  flex-wrap justify-between gap-4">
  <!-- Variant Selection here -->

  <SharedPrice
    :product="product"
  />

  <div
    class="flex gap-2 text-status-info"
  >
    <FormKitIcon icon="truck-fast" class="w-6 h-6 block"/>
    <span v-if="product.shippingFree">
      free shipping
    </span>
    <span v-else-if="sessionContext.shippingMethod">
      {{ sessionContext.shippingMethod.deliveryTime.name }}
    </span>
  </div>

  <SharedProductAddToCart :product="product" />
</div>
</template>

<style scoped>

</style>