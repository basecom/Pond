<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { ApiClientError } from '@shopware/api-client';
import { getSmallestThumbnailUrl, getProductRoute } from '@shopware-pwa/helpers-next';
const { pushError, pushSuccess } = useNotifications();

const props = defineProps<{
    lineItem: Schemas['LineItem'];
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
            pushError('An error occured trying to change the quantity of ' + lineItem.value.label + '.');

            console.log(error.details);
        }
    }

    pushSuccess('The quantity of ' + lineItem.value.label + ' has been updated');

    // Make sure that quantity is the same as it is in the response
    quantity.value = itemQuantity.value;

    isLoading.value = false;
};

const removeCartItem = async () => {
    isLoading.value = true;

    try {
        await removeItem();
    } catch (error) {
        if (error instanceof ApiClientError) {
            pushError('An error occured trying to remove ' + lineItem.value.label + ' from the cart.');

            console.log(error.details);
        }
    }

    pushSuccess(lineItem.value.label + ' has been removed from your cart');

    isLoading.value = false;
};

const updateQuantityOnEnter = $event => {
    if ($event.target !== null) {
        // remove focus from input to trigger update
        $event.target.blur();
    }
};

// allows the user to change the quantity multiple times before firing a single request
const debounceUpdate = useDebounceFn(updateQuantity, 400);
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
            <div class="flex flex-col justify-between lg:flex-row">
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
                <span
                    v-for="option in itemOptions"
                    :key="option.group"
                    class="mr-2"
                >
                    {{ option.group }}: {{ option.option }}
                </span>
            </p>
        </div>

        <div
            v-if="isStackable"
            class="flex flex-1 items-end justify-between text-sm"
        >
            <!-- Fallback for the maxPurchase value defaults to the configured maximum quantity in the admin cart settings if unset at the lineItem -->
            <NumberFieldRoot
                v-model="quantity"
                :disabled="isLoading"
                :locale="'de-DE'"
                :min="lineItem.quantityInformation?.minPurchase || 1"
                :max="lineItem.quantityInformation?.maxPurchase"
                :step="lineItem.quantityInformation?.purchaseSteps || 1"
                name="quantity"
                class="mt-1 flex rounded-md border border-gray-medium bg-white px-3 py-2 shadow-sm sm:text-sm"
                @update:model-value="debounceUpdate"
            >
                <NumberFieldDecrement class="data-[disabled]:opacity-20">
                    <FormKitIcon
                        icon="minus"
                        class="block w-3"
                    />
                </NumberFieldDecrement>

                <NumberFieldInput
                    class="w-14 text-center focus:outline-none"
                    @keyup.enter="updateQuantityOnEnter($event)"
                />

                <NumberFieldIncrement class="data-[disabled]:opacity-20">
                    <FormKitIcon
                        icon="plus"
                        class="block w-3"
                    />
                </NumberFieldIncrement>
            </NumberFieldRoot>

            <div class="flex">
                <button
                    v-if="isRemovable"
                    type="button"
                    class="bg-transparent text-brand-primary-dark"
                    :class="{ 'text-gray-medium': isLoading }"
                    @click="removeCartItem"
                >
                    Remove
                </button>
            </div>
        </div>
    </div>
</template>
