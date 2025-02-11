<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

const { getFormattedPrice } = usePrice();
const { getProductCover } = useMedia();
const { getLineItemRoute } = useLineItemRoute();

const props = defineProps<{
    lineItem: Schemas['LineItem'];
}>();

const { lineItem } = toRefs(props);
const { isPromotion } = useCartItem(lineItem);

const lineItemCover = getProductCover(lineItem.value.cover, 'xs');

const lineItemSeoUrl = await getLineItemRoute(lineItem.value);
</script>

<template>
    <div class="mr-4 size-24 shrink-0 overflow-hidden rounded-md border border-gray-medium bg-gray-light">
        <LocaleLink
            v-if="!isPromotion"
            :to="lineItemSeoUrl"
        >
            <template v-if="lineItemCover.placeholder">
                <SharedImagePlaceholder :size="'sm'" />
            </template>

            <template v-else>
                <img
                    :src="lineItemCover.url"
                    :alt="lineItemCover.alt ?? (getTranslatedProperty(lineItem, 'name') || lineItem.label)"
                    :title="lineItemCover.title ?? (getTranslatedProperty(lineItem, 'name') || lineItem.label)"
                    class="size-full object-cover object-center"
                >
            </template>
        </LocaleLink>

        <div
            v-else-if="isPromotion"
            class="flex size-full items-center justify-center"
        >
            <FormKitIcon
                icon="percent"
                class="block size-16 text-gray"
            />
        </div>
    </div>

    <div class="flex flex-1 flex-col">
        <div>
            <div class="flex flex-col justify-between gap-4 lg:flex-row">
                <LocaleLink
                    v-if="!isPromotion"
                    :to="lineItemSeoUrl"
                >
                    <h3 class="text-base">
                        {{ lineItem?.label }}
                    </h3>
                </LocaleLink>

                <h3
                    v-else-if="isPromotion"
                    class="text-base"
                >
                    {{ lineItem.label }}
                </h3>

                <span>
                    {{ getFormattedPrice(lineItem?.totalPrice) }}
                </span>
            </div>

            <p
                v-if="lineItem?.payload?.options"
                class="mt-1 text-sm"
            >
                <span
                    v-for="option in lineItem?.payload?.options"
                    :key="option.group"
                    class="mr-2"
                >
                    {{ option.group }}: {{ option.option }}
                </span>
            </p>
        </div>

        <div
            v-if="lineItem?.stackable"
            class="flex flex-1 items-end justify-between text-sm"
        >
            <SharedQuantityInput
                :line-item="lineItem"
                :static="true"
            />

            x {{ getFormattedPrice(lineItem?.unitPrice) }}
        </div>
    </div>
</template>
