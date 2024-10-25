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

const config = useCmsElementConfig(props.element);
const boxLayout = config.getConfigValue('boxLayout');
await search(criteria.value);
productListingCriteriaStore.setSearchResult(getCurrentListing.value, true);
</script>

<template>
    <div v-if="getElements.length > 0">
        <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            <template
                v-for="product in getElements"
                :key="product.id"
            >
                <ProductCard
                    :product="product"
                    :layout="boxLayout"
                />
            </template>
        </div>

        <LayoutPagination
            :total="total ?? 0"
            :items-per-page="limit"
            :default-page="page"
            @update-page="currentPage => changePage(currentPage)"
        />
    </div>

    <UtilityStaticNotification
        v-else
        :id="props.element.id + '-no-products-found'"
        type="info"
        :message="$t('cms.element.product.noProductsFound')"
        class="mt-4"
    />
</template>
