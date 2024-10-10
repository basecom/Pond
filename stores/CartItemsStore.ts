import type { Schemas } from '@shopware/api-client/api-types';

export const useCartItemsStore = defineStore('cart-items', () => {
    const { apiClient } = useShopwareContext();
    const { cartItems } = useCart();
    const { data: productSearch, execute } = useLazyAsyncData('checkoutCartItems', async () => {
        const _search = async (searchCriteria: Schemas['Criteria']): Promise<Schemas['ProductListingResult']> => {
            const { data } = await apiClient.invoke('readProduct post /product', {
                body: searchCriteria,
            });
            return data;
        };

        const ids = cartItems.value
            .map(item => item.referencedId)
            .filter((key: string | undefined): key is string => !!key);

        return await _search({
            ids: ids,
            limit: ids.length,
            associations: {
                manufacturer: {},
                options: {},
            },
            includes: {
                product: [
                    'id',
                    'name',
                    'productNumber',
                    'calculatedPrice',
                    'description',
                    'translated',
                    'availableStock',
                    'minPurchase',
                    'maxPurchase',
                    'purchaseSteps',
                    'children',
                    'childCount',
                    'manufacturer',
                    'options',
                    'categoryTree',
                ],
                product_manufacturer: ['name'],
                property_group_option: ['name'],
            },
        });
    });

    const products = computed((): Schemas['Product'][] => {
        return productSearch.value?.elements || [];
    });

    const cartItemsWithProduct = computed(() => {
        if (!products.value.length) {
            return [];
        }

        return cartItems.value.map(cartItem => {
            const product = products.value.find(product => product.id === cartItem.referencedId);

            return {
                cartItem,
                product,
            };
        });
    });

    const cartItemsCount = computed((): number => {
        return cartItems.value.reduce((acc: number, lineItem: Schemas['LineItem']) => {
            return acc + lineItem.quantity;
        }, 0);
    });

    watch(cartItems, async (value, oldValue) => {
        const newCartIds = value
            .map(item => item.referencedId)
            .filter((key: string | undefined): key is string => !!key);
        const oldCartIds = oldValue
            .map(item => item.referencedId)
            .filter((key: string | undefined): key is string => !!key);
        const hasCartItemsIdsChanged =
            newCartIds.length !== oldCartIds.length || !newCartIds.every((id, index) => id === oldCartIds[index]);

        if (!hasCartItemsIdsChanged) {
            return;
        }

        await execute();
    });

    return {
        cartItemsWithProduct,
        cartItemsCount,
        products,
    };
});
