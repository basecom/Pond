<script setup lang="ts">
const customerStore = useCustomerStore();
const customerId = computed(() => customerStore.customer?.id);
const { orders, loadOrders, changeCurrentPage, totalPages, currentPage, limit } = useCustomerOrders();

const defaultLimit = 10;
const defaultPage = 1;

const route = useRoute();
const router = useRouter();

limit.value = route.query.limit ? Number(route.query.limit) : defaultLimit;

const changePage = async (page: number) => {
    await router.push({
        query: {
            ...route.query,
            page,
        },
    });

    await changeCurrentPage(page);
};

const isLoading = ref(false);

watch(customerId, async newId => {
    if (newId) {
        isLoading.value = true;
        await loadOrders({
            limit: limit.value,
            page: route.query.page ? Number(route.query.page) : defaultPage,
            customerId: newId,
            sort: [
                {
                    field: 'createdAt',
                    order: 'DESC',
                },
            ],
        });
        isLoading.value = false;
    }
});

onMounted(async () => {
    if (customerId.value) {
        isLoading.value = true;
        await loadOrders({
            limit: limit.value,
            page: route.query.page ? Number(route.query.page) : defaultPage,
            customerId: customerId.value,
            sort: [
                {
                    field: 'createdAt',
                    order: 'DESC',
                },
            ],
        });
        isLoading.value = false;
    }
});
</script>

<template>
    <div>
        <h1 class="mb-2 font-bold">
            {{ $t('account.orders.heading') }}
        </h1>

        <div
            v-if="isLoading"
            class="relative h-20"
        >
            <UtilityLoadingSpinner class="bg-white opacity-50" />
        </div>

        <ul
            v-if="orders.length > 0 && !isLoading"
            class="divide-y-2 divide-brand-primary"
        >
            <li
                v-for="order in orders"
                :key="order.id"
            >
                <SharedAccordionRoot class="rounded-lg shadow-lg">
                    <AccountOrderItem :order-id="order.id" />
                </SharedAccordionRoot>
            </li>

            <LayoutPagination
                :total="totalPages * limit"
                :items-per-page="limit"
                :default-page="Number(currentPage)"
                @update-page="page => changePage(page)"
            />
        </ul>

        <p v-else-if="!isLoading">
            {{ $t('account.orders.noOrdersFound') }}
        </p>
    </div>
</template>
