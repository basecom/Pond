<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getSmallestThumbnailUrl, getProductRoute } from "@shopware-pwa/helpers-next";
import { ApiClientError } from "@shopware/api-client";

const props = defineProps<{
    lineItem: Schemas["LineItem"];
}>();

const { lineItem } = toRefs(props);
const isLoading = ref(false);

const { getFormattedPrice } = usePrice();
const { refreshCart } = useCart();
const {
    itemOptions,
    removeItem,
    itemTotalPrice,
    itemQuantity,
    isPromotion,
    isRemovable,
    isStackable,
    isDigital,
    changeItemQuantity,
} = useCartItem(lineItem);

const quantity = ref();
syncRefs(itemQuantity, quantity);

const updateQuantity = async (quantityInput: number | undefined) => {
    if (quantityInput === itemQuantity.value) return;

    isLoading.value = true;

    try {
        const response = await changeItemQuantity(Number(quantityInput));
        // Refresh cart after quantity update
        await refreshCart(response);
    } catch (error) {
        if (error instanceof ApiClientError) {
            // TODO: User Feedback (BUS-843)
            console.log(error.details);
        }
    }

    // Make sure that quantity is the same as it is in the response
    quantity.value = itemQuantity.value;

    isLoading.value = false;
}

// wait to allow the user to increment or decrement the quantity multiple times in a single request
const debounceUpdate = useDebounceFn(updateQuantity, 400);

watch(quantity, () => debounceUpdate(quantity.value));

const removeCartItem = async () => {
    isLoading.value = true;
    try {
        await removeItem();
    } catch (error) {
        if (error instanceof ApiClientError) {
            // TODO: User Feedback (BUS-843)
            console.log(error.details);
        }
    }
    isLoading.value = false;
};
</script>

<template>
    <div
        v-if="!isPromotion"
        class="mr-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-medium"
    >
        <NuxtLink :to="getProductRoute(lineItem)">
            <img
                :src="getSmallestThumbnailUrl(lineItem.cover)"
                class="h-full w-full object-cover object-center"
            />
        </NuxtLink>
    </div>

    <div class="flex flex-1 flex-col">
        <div>
            <div
                class="flex flex-col lg:flex-row justify-between"
            >
                <NuxtLink :to="getProductRoute(lineItem)">
                    <h3 class="text-base">
                        {{ lineItem.label }}
                    </h3>
                </NuxtLink>

                <span v-if="itemTotalPrice">
                    {{ getFormattedPrice(itemTotalPrice) }}
                </span>
            </div>

            <span v-if="isDigital">Digital product</span>

            <p
                v-if="itemOptions"
                class="mt-1 text-sm"
            >
                <span v-for="option in itemOptions" :key="option.group" class="mr-2">
                  {{ option.group }}: {{ option.option }}
                </span>
            </p>
        </div>

        <div
            v-if="isStackable"
            class="flex flex-1 items-end justify-between text-sm"
        >
            <input
                v-model="quantity"
                type="number"
                :disabled="isLoading"
                :min="(lineItem as any).quantityInformation?.minPurchase || 1"
                :max="(lineItem as any).quantityInformation?.maxPurchase"
                :step="(lineItem as any).quantityInformation?.purchaseSteps || 1"
                name="quantity"
                aria-label="Cart item quantity"
                class="w-18 mt-1 inline-block py-2 px-3 border border-gray-medium bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
            />

            <div class="flex">
                <button
                    v-if="isRemovable"
                    type="button"
                    class="text-brand-primary-dark bg-transparent"
                    :class="{ 'text-gray-medium': isLoading }"
                    @click="removeCartItem"
                >
                    Remove
                </button>
            </div>
        </div>
    </div>
</template>