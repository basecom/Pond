<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { ApiClientError } from '@shopware/api-client';
const { getProductRoute } = useProductRoute();
const { getProductCover } = useMedia();
const { pushError, pushSuccess } = useNotifications();
const { t } = useI18n();

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

        pushSuccess(t('checkout.lineItem.updateQuantity.successMessage', { lineItemName: lineItem.value.label }));
    } catch (error) {
        pushError(t('checkout.lineItem.updateQuantity.errorMessage', { lineItemName: lineItem.value.label }));

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

        pushSuccess(t('checkout.lineItem.remove.successMessage', { lineItemName: lineItem.value.label }));
    } catch (error) {
        pushError(t('checkout.lineItem.remove.errorMessage', { lineItemName: lineItem.value.label }));

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
    <div class="mr-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-medium bg-gray-light">
        <NuxtLink
            v-if="!isPromotion"
            :to="getProductRoute(lineItem)"
        >
            <template v-if="lineItemCover.placeholder">
                <SharedImagePlaceholder :size="'sm'" />
            </template>

            <template v-else>
                <img
                    :src="lineItemCover.url"
                    :alt="lineItemCover.alt"
                    class="h-full w-full object-cover object-center"
                />
            </template>
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
            <div class="flex flex-col justify-between gap-4 lg:flex-row">
                <NuxtLink :to="getProductRoute(lineItem)">
                    <p>
                        {{ lineItem.label }}
                    </p>
                </NuxtLink>

                <span v-if="itemTotalPrice">
                    {{ getFormattedPrice(itemTotalPrice) }}
                </span>
            </div>

            <span v-if="isDigital">{{ $t('checkout.lineItem.digitalProductInfo') }}</span>

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

            <ProductAvailability :product="lineItem" />
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
                {{ $t('checkout.lineItem.remove.buttonLabel') }}
            </button>
        </div>
    </div>
</template>
