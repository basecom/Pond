<script setup lang="ts">
import { useListingStore } from '~/stores/ListingStore';

const props = defineProps<{
    element: CmsElementProductListing;
}>();

const route = useRoute();
const { trackSelectItem } = useAnalytics();
const { getElements, search, getCurrentListing, loading } = useCategoryListing();

const listingStore = useListingStore('category');
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

    await search(listingState.value.criteria);
    listingStore.setSearchResult(getCurrentListing.value);
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
await search(listingState.value.criteria);
listingStore.setSearchResult(getCurrentListing.value, true);
</script>

<template>
    <div v-if="getElements.length > 0">
        <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            <template v-if="loading">
                <ProductCardSkeleton
                    v-for="index in cardSkeletons"
                    :key="index"
                />
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

        <LayoutPagination
            :total="listingState.pagination.total ?? 0"
            :items-per-page="listingState.pagination.limit"
            :default-page="listingState.pagination.page"
            @update-page="(currentPage: number) => changePage(currentPage)"
        />
    </div>

    <UtilityStaticNotification
        v-else
        type="info"
        :message="$t('cms.element.product.noProductsFound')"
        class="mt-4"
    />
</template>
