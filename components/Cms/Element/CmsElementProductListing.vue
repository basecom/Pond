<script setup lang="ts">
import { useListingStore } from '~/stores/ListingStore';

const props = withDefaults(
    defineProps<{
        element: CmsElementProductListing;
        productListingStoreKey?: string;
    }>(),
    {
        productListingStoreKey: 'category',
    },
);

const route = useRoute();
const { trackSelectItem } = useAnalytics();
const { getElements, search, getCurrentListing } = useCategoryListing();

const listingStore = useListingStore(props.productListingStoreKey);
const { listingState } = storeToRefs(listingStore);

listingStore.initializeCriteria(
    {
        limit: props.element.data.listing.limit,
        p: props.element.data.listing.page,
        associations: {
            children: {},
            manufacturer: {},
            options: {},
            media: {},
        },
    },
    route.query,
);

const { y: windowYPosition } = useScroll(window, { behavior: 'smooth' });

const changePage = async (page: number) => {
    windowYPosition.value = 0;
    listingStore.setPage(page);

    listingStore.displayCardSkeleton = true;
    await search(listingState.value.criteria);
    listingStore.setSearchResult(getCurrentListing.value, true);
    listingStore.displayCardSkeleton = false;
};

const cardSkeletons = computed(() => {
    if (!listingState.value.pagination.total || !listingState.value.pagination.limit) {
        return 24;
    }

    if (listingState.value.pagination.total < listingState.value.pagination.limit) {
        return listingState.value.pagination.total;
    }

    return listingState.value.pagination.limit;
});

const config = useCmsElementConfig(props.element);
const boxLayout = config.getConfigValue('boxLayout');

listingStore.setSearchResult(props.element.data.listing, true);

const products = computed(() => 
    // If the store is loading, return an empty array
    // Otherwise check getElements - use it if it's not empty
    // If it is empty, we need to check if the current listing is set
    // If it is, we need to return an empty array -> this means the filter combination has no results
    // If it is not, fall back to the default elements provided by the cms element -> this means the evaluation ran upon the initial page load
    (listingStore.isLoading) ? [] : (getElements.value.length ? getElements.value : (getCurrentListing.value ? [] : props.element.data.listing.elements)),
);
</script>

<template>
    <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <template v-if="listingStore.isLoading || listingStore.displayCardSkeleton">
            <ClientOnly>
                <LayoutSkeletonProductCard
                    v-for="index in cardSkeletons"
                    :key="index"
                />
            </ClientOnly>
        </template>

        <template
            v-for="(product, index) in products"
            v-else
            :key="product.id"
        >
            <ProductCard
                :product="product"
                :layout="boxLayout"
                :should-preload-image="index === 0"
                @select-product="trackSelectItem(product)"
            />
        </template>
    </div>

    <UtilityStaticNotification
        v-if="!products.length && !listingStore.isLoading"
        type="info"
        :message="$t('cms.element.product.noProductsFound')"
        class="mt-4"
    />

    <template v-if="listingStore.isLoading || listingStore.displayPaginationSkeleton">
        <ClientOnly>
            <LayoutSkeletonPagination />
        </ClientOnly>
    </template>

    <LayoutPagination
        v-else-if="products.length"
        :total="listingState.pagination.total ?? 0"
        :items-per-page="listingState.pagination.limit"
        :default-page="listingState.pagination.page"
        :page="listingState.pagination.page"
        @update-page="(currentPage: number) => changePage(currentPage)"
    />
</template>
