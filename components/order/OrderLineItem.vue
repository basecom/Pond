<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getProductRoute } from '@shopware-pwa/helpers-next';
const { getFormattedPrice } = usePrice();
const { getProductCover } = useMedia();

const props = defineProps<{
    lineItem: Schemas['LineItem'];
}>();

const { lineItem } = toRefs(props);

const lineItemCover = getProductCover(lineItem.value.cover, 'xs');
</script>

<template>
    <div class="mr-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-medium">
        <NuxtLink :to="getProductRoute(lineItem)">
            <img
                :src="lineItemCover.url"
                :alt="lineItemCover.alt"
                class="h-full w-full object-cover object-center"
            />
        </NuxtLink>
    </div>

    <div class="flex flex-1 flex-col">
        <div>
            <div class="flex flex-col justify-between lg:flex-row">
                <NuxtLink :to="getProductRoute(lineItem)">
                    <h3 class="text-base">
                        {{ lineItem?.label }}
                    </h3>
                </NuxtLink>

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
            <NumberFieldRoot
                :disabled="true"
                :locale="'de-DE'"
                :default-value="lineItem.quantity"
                name="quantity"
                class="mt-1 flex rounded-md border border-gray-medium bg-white px-3 py-2 shadow-sm sm:text-sm"
            >
                <NumberFieldInput class="w-14 bg-transparent text-center focus:outline-none" />
            </NumberFieldRoot>
            x {{ getFormattedPrice(lineItem?.unitPrice) }}
        </div>
    </div>
</template>
