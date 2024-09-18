<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { ApiClientError } from '@shopware/api-client';
const { getProductRoute } = useProductRoute();
const { getProductCover } = useMedia();
const { pushError, pushSuccess } = useNotifications();

const props = defineProps<{
    lineItem: Schemas['LineItem'];
}>();

const { lineItem } = toRefs(props);
const isLoading = ref(false);

const lineItemCover = getProductCover(lineItem.value.cover, 'xs');

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

        pushSuccess('The quantity of ' + lineItem.value.label + ' has been updated');
    } catch (error) {
        pushError('An error occured trying to change the quantity of ' + lineItem.value.label + '.');

        if (error instanceof ApiClientError) {
            console.log(error.details);
        }
    }

    // Make sure that quantity is the same as it is in the response
    quantity.value = itemQuantity.value;

    isLoading.value = false;
};

const removeCartItem = async () => {
    isLoading.value = true;

    try {
        await removeItem();

        pushSuccess(lineItem.value.label + ' has been removed from your cart');
    } catch (error) {
        pushError('An error occured trying to remove ' + lineItem.value.label + ' from the cart.');

        if (error instanceof ApiClientError) {
            console.log(error.details);
        }
    }

    isLoading.value = false;
};

const updateQuantityOnEnter = $event => {
    if ($event.target !== null) {
        // remove focus from input to trigger update
        $event.target.blur();
    }
};

// allows the user to change the quantity multiple times before firing a single request
const debounceUpdate = useDebounceFn(updateQuantity, 600);
</script>

<template>
    <div class="mr-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-medium">
        <NuxtLink
            v-if="!isPromotion"
            :to="getProductRoute(lineItem)"
        >
            <img
                :src="lineItemCover.url"
                :alt="lineItemCover.alt"
                class="h-full w-full object-cover object-center"
            />
        </NuxtLink>
        <div
            v-else-if="isPromotion"
            class="flex h-full w-full items-center justify-center"
        >
            <FormKitIcon
                icon="percent"
                class="block h-16 w-16 text-gray"
            />
        </div>
    </div>

    <div class="flex flex-1 flex-col">
        <div>
            <div class="flex flex-col justify-between lg:flex-row">
                <NuxtLink :to="getProductRoute(lineItem)">
                    <p>
                        {{ lineItem.label }}
                    </p>
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

        <div class="flex flex-1 items-end justify-between text-sm">
            <SharedQuantityInput
                v-if="isStackable"
                v-model="quantity"
                :line-item="lineItem"
                :is-loading="isLoading"
                @on-update="debounceUpdate"
                @on-enter="updateQuantityOnEnter($event)"
            />

            <button
                v-if="isRemovable"
                type="button"
                class="ml-auto bg-transparent text-brand-primary-dark"
                :class="{ 'text-gray-medium': isLoading }"
                @click="removeCartItem"
            >
                Remove
            </button>
        </div>
    </div>
</template>
