<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const { getFormattedPrice } = usePrice();

const props = withDefaults(defineProps<{
  product: Schemas['Product'];
  listPriceDisplay?: 'none'|'percentage'|'value'
}>(), {
  listPriceDisplay: 'percentage'
});

const product = ref(props.product)

const { price, unitPrice, isListPrice } = useProductPrice(product);
const listPriceClasses = computed(() => 'text-xs')
</script>

<template>
  <div>
    <p>
      <span
        v-if="unitPrice"
        class="text-3xl font-bold pr-2"
        :class="{
          'text-status-danger': isListPrice
        }"
      >
        {{ getFormattedPrice(unitPrice) }}
      </span>

      <template
        v-if="isListPrice"
      >
        <span :class="listPriceClasses" class="line-through">
          {{ getFormattedPrice(price?.listPrice.price) }}

          <template v-if="listPriceDisplay === 'percentage'">
            (-{{ price?.listPrice.percentage }}%)
          </template>

          <template v-else-if="listPriceDisplay === 'value'">
            ({{ getFormattedPrice(price?.listPrice.discount) }})
          </template>
        </span>
      </template>
    </p>
    <p class="text-xs w-full">
      vat info
    </p>
  </div>
</template>
