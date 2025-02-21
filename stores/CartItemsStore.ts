import type { Schemas } from '@shopware/api-client/api-types';

export const useCartItemsStore = defineStore('cart-items', () => {
    const { apiClient } = useShopwareContext();
    const { cartItems } = useCart();
    const { data, execute } = useLazyAsyncData('checkoutCartItems', async () => {
        const _search = async (searchCriteria: Schemas['Criteria']): Promise<Schemas['ProductListingResult']> => {
            const { data } = await apiClient.invoke('readProduct post /product', {
                body: searchCriteria,
            });
            return data;
        };

        const ids = cartItems.value
            .filter(item => item.type === 'product')
            .map(item => item.referencedId)
            .filter((key: string | undefined): key is string => !!key);

        if (ids.length === 0) {
            // when there are no ids we should not fetch -> as this causes an error
            return [];
        }

        return await _search({
            ids,
            limit: ids.length,
            associations: {
                manufacturer: {},
                options: {},
                seoUrls: {},
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
                    'seoUrls',
                    'categoryTree',
                ],
                product_manufacturer: ['name'],
                property_group_option: ['name'],
            },
        });
    });

    const productSearch = data.value as Schemas['ProductListingResult'];
    const products = computed((): Schemas['Product'][] => productSearch?.elements || []);

    const cartItemsWithProduct = computed(() => {
        if (!products.value.length) {
            return [];
        }

        return cartItems.value.map(cartItem => {
            const product = products.value.find(currentProduct => currentProduct.id === cartItem.referencedId);

            return {
                cartItem,
                product,
            };
        });
    });

    const cartItemsCount = computed((): number =>
        cartItems.value.reduce((acc: number, lineItem: Schemas['LineItem']) => acc + lineItem.quantity, 0),
    );

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
