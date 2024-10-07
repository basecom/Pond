import type { Schemas } from '@shopware/api-client/api-types';
import type { TrackingCartEvent } from '../../types/analytics/cart';
import type { TrackingLineItem } from '../../types/analytics/line-item';

export function useCartTrackingHelper() {
    const { getTrackingLineItem } = useItemTracking();
    const { currencyCode } = usePrice();
    const _category = useContext<Schemas['Category']>('category');

    const getCartTrackEventForSingleItem = (
        cart: Schemas['Cart'],
        product: Schemas['Product'],
        quantity?: number,
    ): TrackingCartEvent | undefined => {
        const lineItemIndex = cart.lineItems?.findIndex(item => item.referencedId === product.id) ?? -1;

        if (lineItemIndex === -1) {
            return;
        }

        const list = _category.value ? { id: _category.value.id, name: _category.value.name } : undefined;
        const lineItem = cart.lineItems?.[lineItemIndex] as Schemas['LineItem'];
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

    const getCartTrackEventForMultipleItems = (
        cart: Schemas['Cart'],
        products: Schemas['Product'][],
    ): TrackingCartEvent => {
        const getLineItemsTracking = cart.lineItems
            ?.map((lineItem, index) => {
                const product = products.find(product => product.id === lineItem.referencedId);
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
            value: cart.price?.totalPrice ?? 0,
            items: getLineItemsTracking,
            currency: currencyCode.value,
        };
    };

    return {
        getCartTrackEventForSingleItem,
        getCartTrackEventForMultipleItems,
    };
}
