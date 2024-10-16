import type { Schemas } from '#shopware';

export const useCustomerLatestOrder = () => {
    const { apiClient } = useShopwareContext();
    const latestOrder = ref<Schemas['Order']>();

    const loadLatestOrder = async (): Promise<void> => {
        const fetchedOrder = await apiClient.invoke('readOrder post /order', {
            body: {
                limit: 1,
                'total-count-mode': 'exact',
                includes: {
                    order: ['id'],
                },
                sort: [
                    {
                        field: 'createdAt',
                        order: 'DESC',
                    },
                ],
            },
        });
        if (fetchedOrder.data.orders.elements) {
            latestOrder.value = fetchedOrder.data.orders.elements[0];
        }
    };

    return {
        latestOrder,
        loadLatestOrder,
    };
};
