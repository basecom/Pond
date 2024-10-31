import type { Schemas } from '@shopware/api-client/api-types';
import type { TrackingEcommerceEvent } from '../../types/analytics/ecommerce';
import type { TrackingLineItem } from '../../types/analytics/line-item';

export function useEcommerceTrackingHelper() {
    const { getTrackingItem } = useItemTracking();
    const { getShippingInfo, getPaymentInfo } = useCheckoutInfoTracking();
    const { currencyCode } = usePrice();
    const { cart } = useCart();
    const cartItemsStore = useCartItemsStore();
    const { products: _products } = storeToRefs(cartItemsStore);
    const _category = useContext<Schemas['Category']>('category');
    const _currentProduct = ref<Schemas['Product'] | undefined>(undefined);
    const _currentProductPrice = useProductPrice(_currentProduct);

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
        const lineItemTracking = getTrackingItem({
            itemIndex: lineItemIndex + 1,
            product,
            price: lineItem.price as Schemas['CalculatedPrice'],
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
            ?.filter(item => item.type === 'product')
            .map((lineItem, index) => {
                const product = _products.value.find(product => product.id === lineItem.referencedId);
                if (!product) {
                    return;
                }

                const list = _category.value ? { id: _category.value.id, name: _category.value.name } : undefined;

                return getTrackingItem({
                    itemIndex: index + 1,
                    quantity: lineItem.quantity,
                    product,
                    price: lineItem.price as Schemas['CalculatedPrice'],
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

    const getEventForProductList = (products: Schemas['Product'][]): TrackingEcommerceEvent => {
        const productItems = products.map((product, index) => {
            const list = _category.value ? { id: _category.value.id, name: _category.value.name } : undefined;
            _currentProduct.value = product;

            return getTrackingItem({
                itemIndex: index + 1,
                quantity: 1,
                price: _currentProductPrice.price.value,
                product,
                list,
            });
        });

        return {
            items: productItems,
        };
    };

    const getEventForProduct = (product: Schemas['Product']): TrackingEcommerceEvent => {
        const list = _category.value ? { id: _category.value.id, name: _category.value.name } : undefined;
        _currentProduct.value = product;

        const item = getTrackingItem({
            itemIndex: 1,
            quantity: 1,
            price: _currentProductPrice.price.value,
            product,
            list,
        });

        return {
            items: [item],
        };
    };

    const getEventForProductWithPrice = (product: Schemas['Product']): TrackingEcommerceEvent => {
        const event = getEventForProduct(product);

        return {
            ...event,
            value: event.items[0]?.price,
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
            value: order.price.totalPrice,
            tax: order.price.calculatedTaxes?.reduce((acc, tax) => acc + tax.tax, 0) ?? 0,
            shipping: order.deliveries?.[0]?.shippingCosts?.totalPrice ?? 0,
        };
    };

    return {
        getEventForSingleItem,
        getEventForAllItems,
        getEventForProductList,
        getEventForProduct,
        getEventForProductWithPrice,
        getEventWithShippingInfo,
        getEventWithPaymentInfo,
        getPurchasedEvent,
    };
}
