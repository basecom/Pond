<script setup lang="ts">
import type { CmsElementText } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementText;
}>();

const { t } = useI18n();

const { getElements, changeCurrentPage, getCurrentPage, search, getTotal, getLimit } = useListing({
    listingType: 'categoryListing',
    defaultSearchCriteria: {
        limit: props.element.data.listing.limit,
        p: props.element.data.listing.page,
    },
});

search({
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
});

const router = useRouter();
const route = useRoute();

const { y: windowYPosition } = useScroll(window, { behavior: 'smooth' });

const changePage = async (page: number) => {
    await router.push({
        query: {
            ...route.query,
            p: page,
        },
    });

    windowYPosition.value = 0;

    await changeCurrentPage(page, route.query);
};
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
                    :layout="element.translated.config.boxLayout.value"
                />
            </template>
        </div>

        <LayoutPagination
            :total="getTotal"
            :items-per-page="getLimit"
            :default-page="getCurrentPage"
            @update-page="page => changePage(page)"
        />
    </div>
    <SharedBanner
        v-else
        type="info"
        :message="$t('cms.element.product.noProductsFound')"
    />
</template>
