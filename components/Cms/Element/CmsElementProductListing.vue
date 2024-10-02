<script setup lang="ts">
const props = defineProps<{
    element: CmsElementProductListing;
}>();
const route = useRoute();
const { getElements, search, getCurrentListing } = useCategoryListing();
// TODO create a better ID based on the CmsPage or even better CmsSlot identifier
const productListingCriteriaStore = useProductListingCriteriaStore('category');
const { criteria, total, page, limit } = storeToRefs(productListingCriteriaStore);

productListingCriteriaStore.initializeCriteria(
    {
        limit: props.element.data.listing.limit,
        p: props.element.data.listing.page,
        associations: {
            children: {},
        },
        includes: {
            product: [
                'id',
                'name',
                'cover',
                'calculatedPrice',
                'description',
                'translated',
                'availableStock',
                'minPurchase',
                'maxPurchase',
                'purchaseSteps',
                'children',
                'childCount',
            ],
            product_media: ['media'],
            media: ['url'],
        },
    },
    route.query,
);

const { y: windowYPosition } = useScroll(window, { behavior: 'smooth' });

const changePage = async (page: number) => {
    windowYPosition.value = 0;
    productListingCriteriaStore.setPage(page);

    await search(criteria.value);
    productListingCriteriaStore.setSearchResult(getCurrentListing.value);
};
await search(criteria.value);
productListingCriteriaStore.setSearchResult(getCurrentListing.value);
</script>

<template>
    <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <template
            v-for="product in getElements"
            :key="product.id"
        >
            <ProductCard
                :product="product"
                :layout="element.translated.config.boxLayout.value"
            />
        </template>
    </div>

    <LayoutPagination
        :total="total ?? 0"
        :items-per-page="limit"
        :default-page="page"
        @update-page="currentPage => changePage(currentPage)"
    />
</template>
