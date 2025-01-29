<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const { getProductRoute } = useProductRoute();
const { getProductCover } = useMedia();
const { pushError, pushSuccess } = useNotifications();
const { throwError } = useThrowError();
const { t } = useI18n();

const props = defineProps<{
    lineItem: Schemas['LineItem'];
    product: Schemas['Product'];
}>();

const { lineItem, product } = toRefs(props);
const isLoading = ref(false);

const lineItemCover = getProductCover(lineItem.value.cover, 'xs');

const { getFormattedPrice } = usePrice();
const { refreshCart } = useCart();
const { trackAddToCart, trackRemoveFromCart } = useAnalytics();
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

    const addedProductsNumbers = Number(quantityInput) - itemQuantity.value;
    isLoading.value = true;

    try {
        const response = await changeItemQuantity(Number(quantityInput));
        if (addedProductsNumbers > 0) {
            trackAddToCart(product.value, addedProductsNumbers);
        } else {
            trackRemoveFromCart(product.value, Math.abs(addedProductsNumbers));
        }
        // Refresh cart after quantity update
        await refreshCart(response);

        pushSuccess(t('checkout.lineItem.updateQuantity.successMessage', { lineItemName: lineItem.value.label }));
    } catch (error) {
        pushError(t('checkout.lineItem.updateQuantity.errorMessage', { lineItemName: lineItem.value.label }));
        throwError(error);
    }

    // Make sure that quantity is the same as it is in the response
    quantity.value = itemQuantity.value;

    isLoading.value = false;
};

const removeCartItem = async () => {
    isLoading.value = true;

    try {
        trackRemoveFromCart(product.value, lineItem.value.quantity);
        await removeItem();

        pushSuccess(t('checkout.lineItem.remove.successMessage', { lineItemName: lineItem.value.label }));
    } catch (error) {
        pushError(t('checkout.lineItem.remove.errorMessage', { lineItemName: lineItem.value.label }));
        throwError(error);
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
    <div class="mr-4 size-24 shrink-0 overflow-hidden rounded-md border border-gray-medium bg-gray-light">
        <LocaleLink
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
                    class="size-full object-cover object-center"
                />
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
                <LocaleLink :to="getProductRoute(lineItem)">
                    <p>
                        {{ lineItem.label }}
                    </p>
                </LocaleLink>

                <span v-if="itemTotalPrice">
                    {{ getFormattedPrice(itemTotalPrice) }}
                </span>
            </div>

            <span v-if="isDigital">{{ $t('checkout.lineItem.digitalProduct') }}</span>

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
