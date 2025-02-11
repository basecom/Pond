import type { Schemas } from '@shopware/api-client/api-types';

export const useCustomerLatestOrder = () => {
    const { apiClient } = useShopwareContext();

    const getLatestOrder = async (): Promise<Schemas['Order'] | null> => {
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

        return fetchedOrder.data.orders.elements.length > 0 ? fetchedOrder.data.orders.elements[0] : null;
    };

    return {
        getLatestOrder,
    };
};
