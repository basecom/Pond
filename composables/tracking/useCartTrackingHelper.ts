import type { Schemas } from '@shopware/api-client/api-types';
import type { TrackingCartEvent } from '../../types/analytics/cart';
import type { TrackingLineItem } from '../../types/analytics/line-item';

export function useCartTrackingHelper() {
    const { getTrackingLineItem } = useItemTracking();
    const { currencyCode } = usePrice();
    const { cart } = useCart();
    const cartItemsStore = useCartItemsStore();
    const { products } = storeToRefs(cartItemsStore)
    const _category = useContext<Schemas['Category']>('category');

    const getCartTrackEventForSingleItem = (
        product: Schemas['Product'],
        quantity?: number,
    ): TrackingCartEvent | undefined => {
        const currentCart: Schemas['Cart'] = cart.value;

        const lineItemIndex = currentCart.lineItems?.findIndex(item => item.referencedId === product.id) ?? -1;

        if (lineItemIndex === -1) {
            return;
        }

        const list = _category.value ? { id: _category.value.id, name: _category.value.name } : undefined;
        const lineItem = currentCart.lineItems?.[lineItemIndex] as Schemas['LineItem'];
        const lineItemTracking = getTrackingLineItem({
            item: lineItem,
            itemIndex: lineItemIndex + 1,
            product,
            list,
            quantity,
        });
        return {
            value: lineItemTracking.price * lineItemTracking.quantity,
            currency: currencyCode.value,
            items: [lineItemTracking],
        };
    };

    const getCartTrackEventForAllItems = (): TrackingCartEvent => {
        const currentCart: Schemas['Cart'] = cart.value;
        const getLineItemsTracking = currentCart.lineItems
            ?.map((lineItem, index) => {
                const product = products.value.find(product => product.id === lineItem.referencedId);
                if (!product) {
                    return;
                }

                const list = _category.value ? { id: _category.value.id, name: _category.value.name } : undefined;

                return getTrackingLineItem({
                    item: lineItem,
                    itemIndex: index + 1,
                    quantity: lineItem.quantity,
                    product,
                    list,
                });
            })
            .filter(Boolean) as TrackingLineItem[];

        return {
            value: currentCart.price?.totalPrice ?? 0,
            items: getLineItemsTracking,
            currency: currencyCode.value,
        };
    };

    return {
        getCartTrackEventForSingleItem,
        getCartTrackEventForAllItems,
    };
}
