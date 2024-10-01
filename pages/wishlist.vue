<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n();
useBreadcrumbs([
    {
        name: t('wishlist.titleHeader'),
        path: '/wishlist',
    },
]);

const { pushSuccess, pushError } = useNotifications();

const defaultLimit = 15;
const defaultPage = 1;

const { items, clearWishlist, getWishlistProducts, currentPage, totalPagesCount, canSyncWishlist } = useWishlist();

const { apiClient } = useShopwareContext();
const products = ref<Schemas['Product'][]>([]);
const isLoading = ref(false);
const router = useRouter();
const route = useRoute();
const page = ref(route.query.page ? Number(route.query.page) : defaultPage);
const cacheKey = computed(() => `wishlist-${JSON.stringify(route.query)}`);

await getWishlistProducts({ page: page.value, limit: defaultLimit });

const clearWishlistHandler = async () => {
    try {
        isLoading.value = true;
        await clearWishlist();
        pushSuccess(t('wishlist.clearedSuccessfully'));
    } catch (error) {
        pushError(t('wishlist.errorClearingWishlist'));
    }
    finally {
        isLoading.value = false;
    }
};

const loadProductsByItemIds = async (itemIds: string[], cacheKey: string) => {
    isLoading.value = true;
    const { status } = await useAsyncData(cacheKey, async () => {
        const { data } = await apiClient.invoke('readProduct post /product', {
            body: { ids: itemIds },
        });
        if (data?.elements) products.value = data.elements;
        return data;
    });
    if (status.value !== 'pending') isLoading.value = false;
};

const changePage = async (page: number) => {
    await router.push({
        query: {
            page: page,
        },
    });

    await getWishlistProducts({
        page: page,
        limit: defaultLimit,
    });
};

watch(
    items,
    async (items, oldItems) => {
        if (items.length !== oldItems?.length) {
            products.value = products.value.filter(({ id }) => items.includes(id));
        }
        if (!items.length) {
            return;
        }
        await loadProductsByItemIds(items, cacheKey.value);
    },
    {
        immediate: true,
    },
);
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
            <button
                class="mb-4 justify-center rounded-md border border-transparent bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm"
                @click="clearWishlistHandler"
            >
                {{ $t('wishlist.clearWishlist') }}
            </button>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                <ProductCard
                    v-for="product in products"
                    :key="product.id"
                    :product="product"
                    class="sm:w-3/7 lg:w-2/7 2xl:w-7/24 mb-8 mr-0 w-full sm:mr-8"
                />
            </div>
            <div
                v-if="canSyncWishlist"
                class="lg- grid grid-cols-1 gap-4 p-4 md:gap-6 md:p-6 lg:flex lg:justify-center lg:gap-8 lg:p-8"
            >
                <div class="place-self-center text-center">
                    <LayoutPagination
                        :total="defaultLimit * totalPagesCount"
                        :items-per-page="defaultLimit"
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
            <NuxtLink to="/">
                <FormKit type="submit">
                    {{ $t('wishlist.continueShopping') }}
                </FormKit>
            </NuxtLink>
        </div>
    </div>
</template>
