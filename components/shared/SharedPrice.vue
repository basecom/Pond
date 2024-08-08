<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const { getFormattedPrice } = usePrice();

const props = withDefaults(
    defineProps<{
        product: Schemas['Product'];
        listPriceDisplay?: 'none' | 'percentage' | 'value';
    }>(),
    {
        listPriceDisplay: 'percentage',
    },
);

const product = ref(props.product);

const { price, unitPrice, isListPrice, referencePrice } = useProductPrice(product);
</script>

<template>
    <div>
        <p>
            <span
                v-if="unitPrice"
                class="pr-2 text-3xl font-bold"
                :class="{
                    'text-status-danger': isListPrice,
                }"
            >
                {{ getFormattedPrice(unitPrice) }}
            </span>

            <template v-if="isListPrice">
                <span class="text-xs line-through">
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
        <p
            v-if="referencePrice"
            class="w-full text-xs text-gray"
        >
            {{ referencePrice.purchaseUnit }} {{ referencePrice.unitName }} ({{
                getFormattedPrice(referencePrice.price)
            }}/{{ referencePrice.referenceUnit }} {{ referencePrice.unitName }})
        </p>
        <p class="w-full text-xs text-gray">vat info</p>
    </div>
</template>
