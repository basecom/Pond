import type { Schemas } from '@shopware/api-client/api-types';
import type { TrackingEcommerceEvent } from '../../types/analytics/ecommerce';
import type { TrackingLineItem } from '../../types/analytics/line-item';

export function useEcommerceTrackingHelper() {
    const { getTrackingLineItem } = useItemTracking();
    const { getShippingInfo, getPaymentInfo } = useCheckoutInfoTracking();
    const { currencyCode } = usePrice();
    const { cart } = useCart();
    const cartItemsStore = useCartItemsStore();
    const { products } = storeToRefs(cartItemsStore);
    const _category = useContext<Schemas['Category']>('category');

    const getEventForSingleItem = (
        product: Schemas['Product'],
        quantity?: number,
    ): TrackingEcommerceEvent | undefined => {
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

    const getEventForAllItems = (): TrackingEcommerceEvent => {
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

    const getEventWithShippingInfo = (): TrackingEcommerceEvent => {
        const trackingEvent = getEventForAllItems();

        return {
            ...trackingEvent,
            shipping_tier: getShippingInfo(),
        };
    };

    const getEventWithPaymentInfo = (): TrackingEcommerceEvent => {
        const trackingEvent = getEventForAllItems();

        return {
            ...trackingEvent,
            payment_type: getPaymentInfo(),
        };
    };

    const getPurchasedEvent = (order: Schemas['Order']): TrackingEcommerceEvent => {
        const trackingEvent = getEventForAllItems();

        return {
            ...trackingEvent,
            transaction_id: order.id,
            value: order.price.netPrice,
            tax: order.price.calculatedTaxes?.reduce((acc, tax) => acc + tax.tax, 0) ?? 0,
            shipping: order.deliveries?.[0]?.shippingCosts?.totalPrice ?? 0,
        };
    };

    return {
        getEventForSingleItem,
        getEventForAllItems,
        getEventWithShippingInfo,
        getEventWithPaymentInfo,
        getPurchasedEvent,
    };
}
