<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
        product: Schemas['Product'];
        listPriceDisplay?: 'none' | 'percentage' | 'value';
        fontSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl';
        fontWeight?: 'font-thin' | 'font-light' | 'font-normal' | 'font-medium' | 'font-semibold' | 'font-bold' | 'font-extrabold' | 'font-black';
        displayVat?: boolean;
    }>(),
    {
        listPriceDisplay: 'percentage',
        fontSize: 'text-3xl',
        fontWeight: 'font-bold',
        displayVat: true,
    },
);

const product = ref(props.product);

const { getFormattedPrice } = usePrice();
const { price, unitPrice, isListPrice, referencePrice } = useProductPrice(product);
</script>

<template>
    <div>
        <p>
            <span
                v-if="unitPrice"
                :class="[fontSize, fontWeight, { 'text-status-danger': isListPrice }]"
            >
                {{ getFormattedPrice(unitPrice) }}
            </span>

            <template v-if="isListPrice">
                <span class="pl-2 text-xs line-through">
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

        <p class="w-full text-xs text-gray" v-if="displayVat">
            vat info
        </p>
    </div>
</template>
