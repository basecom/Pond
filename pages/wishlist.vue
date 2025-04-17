<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n();
const { handleError } = useHandleError();
useBreadcrumbs([
    {
        name: t('wishlist.titleHeader'),
        path: '/wishlist',
    },
]);
const { trackClearWishlist, trackSelectItem } = useAnalytics({ trackPageView: true, pageType: 'wishlist' });

const products = ref<Schemas['Product'][]>([]);

// initialize isLoading with true, because onMounted fetches the items
const isLoading = ref(true);
const router = useRouter();
const route = useRoute();
const defaultLimit = 15;
const defaultPage = 1;
// variable is actually used for LayoutPagination, eslint incorrectly marks this
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const page = ref(route.query.page ? Number(route.query.page) : defaultPage);
const limit = ref(route.query.limit ? Number(route.query.limit) : defaultLimit);

const { pushSuccess, pushError } = useNotifications();
const { items: wishlistItems, clearWishlist, getWishlistProducts, currentPage, totalPagesCount, canSyncWishlist } = useWishlist();
const { apiClient } = useShopwareContext();

const clearWishlistHandler = async () => {
    isLoading.value = true;

    try {
        const productsList = products.value.slice(0);
        await clearWishlist();
        trackClearWishlist(productsList);
        pushSuccess(t('wishlist.clearedSuccessfully'));
    } catch (error) {
        pushError(t('wishlist.errorClearingWishlist'));
    }

    isLoading.value = false;
};

const loadProductsByItemIds = async (itemIds: string[]) => {
    isLoading.value = true;

    try {
        const { data } = await apiClient.invoke('readProduct post /product', {
            body: {
                ids: itemIds,
                associations: {
                    children: {
                        associations: {
                            cover: {},
                        },
                    },
                    manufacturer: {},
                    options: {},
                    seoUrls: {},
                },
            },
        });

        if (data?.elements) products.value = data.elements;
    } catch (error) {
        handleError(error);
    }

    isLoading.value = false;
};

const changePage = async (page: number) => {
    await router.push({
        query: {
            page,
            limit: limit.value,
        },
    });

    await getWishlistProducts({
        page,
        limit: limit.value,
        associations: {
            children: {
                associations: {
                    cover: {},
                },
            },
        },
    });
};

const onSelectProduct = async (product: Schemas['Product']) => {
    trackSelectItem(product, { id: 'wishlist', name: 'wishlist' });
};

// Watch for changes in wishlist items
watch(
    wishlistItems,
    (items, oldItems) => {
        // Remove item from the displayed products if it was removed from the wishlist
        if (items.length !== oldItems?.length) {
            products.value = products.value.filter(({ id }) => items.includes(id));
        }

        // If no items are in the wishlist we don't need to fetch the products
        if (!items.length) {
            isLoading.value = false;
            return;
        }

        // Fetch product data for the items that are in the wishlist
        loadProductsByItemIds(items);
    },
    {
        immediate: true,
    },
);

// Initial request to fetch wishlist items with limit and page on mount and trigger items watcher through it
onMounted(() => {
    const route = useRoute();
    const limit = ref(route.query.limit ? Number(route.query.limit) : defaultLimit);
    const page = ref(route.query.page ? Number(route.query.page) : defaultPage);

    getWishlistProducts({
        limit: limit.value,
        page: page.value,
        associations: {
            children: {
                associations: {
                    cover: {},
                },
            },
        },
    });
});
</script>

<template>
    <div class="container relative mx-auto">
        <UtilityLoadingSpinner
            v-if="isLoading"
            size="normal"
        />

        <div v-else-if="products.length">
            <h1 class="my-3 text-3xl font-extrabold">
                {{ $t('wishlist.titleHeader') }}
            </h1>

            <FormKit
                type="submit"
                :label="$t('wishlist.clearWishlist')"
                :classes="{
                    outer: 'max-w-fit mb-4',
                }"
                @click="clearWishlistHandler"
            />

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                <ProductCard
                    v-for="product in products"
                    :key="product.id"
                    :product="product"
                    class="sm:w-3/7 lg:w-2/7 2xl:w-7/24 mb-8 mr-0 w-full sm:mr-8"
                    @select-product="onSelectProduct(product)"
                />
            </div>

            <div
                v-if="canSyncWishlist"
                class="lg- grid grid-cols-1 gap-4 p-4 md:gap-6 md:p-6 lg:flex lg:justify-center lg:gap-8 lg:p-8"
            >
                <div class="place-self-center text-center">
                    <LayoutPagination
                        :total="totalPagesCount"
                        :items-per-page="limit"
                        :default-page="Number(currentPage)"
                        @update-page="page => changePage(page)"
                    />
                </div>
            </div>
        </div>

        <div
            v-else
            class="col mx-auto flex flex-col items-center"
        >
            <h1 class="my-3 text-3xl font-extrabold">
                {{ $t('wishlist.emptyListTitle') }}
            </h1>

            <p class="my-4">{{ $t('wishlist.emptyListSubtitle') }}</p>

            <LocaleLink to="/">
                <FormKit type="submit">
                    {{ $t('wishlist.continueShopping') }}
                </FormKit>
            </LocaleLink>
        </div>
    </div>
</template>
