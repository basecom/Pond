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

    listingStore.isLoading = true;
    await search(listingState.value.criteria);
    listingStore.setSearchResult(getCurrentListing.value);
    listingStore.isLoading = false;
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

const { status: initialStatus } = useLazyAsyncData(
    `category-listing-${ props.element.id }`,
    async () => {
        listingStore.isLoading = true;
        await search(listingState.value.criteria);
        listingStore.setSearchResult(getCurrentListing.value, true);
        listingStore.isLoading = false;

        return listingState.value;
    },
);
</script>

<template>
    <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <template v-if="initialStatus === 'pending' || listingStore.isLoading">
            <ClientOnly>
                <ProductCardSkeleton
                    v-for="index in cardSkeletons"
                    :key="index"
                />
            </ClientOnly>
        </template>

        <template
            v-for="(product, index) in getElements"
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
        v-if="initialStatus !== 'pending' && !getElements.length"
        type="info"
        :message="$t('cms.element.product.noProductsFound')"
        class="mt-4"
    />

    <template v-if="initialStatus === 'pending'  || listingStore.isLoading">
        <ClientOnly>
            <LayoutSkeletonPagination />
        </ClientOnly>
    </template>

    <LayoutPagination
        v-else-if="getElements.length"
        :total="listingState.pagination.total ?? 0"
        :items-per-page="listingState.pagination.limit"
        :default-page="listingState.pagination.page"
        @update-page="(currentPage: number) => changePage(currentPage)"
    />
</template>
