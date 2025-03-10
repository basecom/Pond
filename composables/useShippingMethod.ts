import type { Schemas } from '@shopware/api-client/api-types';

export function useShippingMethod() {
    const preselectShippingMethodFallback = async () => {
        const { getShippingMethods, setShippingMethod, selectedShippingMethod } = useCheckout();
        const { refreshCart } = useCart();

        const shippingMethods = await getShippingMethods();

        const isPreselectedShippingAvailable = shippingMethods.value.find((method: Schemas['ShippingMethod']) => method.id === selectedShippingMethod.value.id);

        if (isPreselectedShippingAvailable) {
            return;
        }

        const getGrossPrice = (method: Schemas['ShippingMethod']): number => {
            const prices = method.prices as { currencyPrice?: { gross?: number }[] }[] | undefined;
            const currencyPrice = prices?.[0]?.currencyPrice as { gross?: number }[] | undefined;
            return currencyPrice?.[0]?.gross ?? Infinity; // Default to Infinity for comparison
        };

        const cheapestMethod = shippingMethods.value.reduce((lowest, current) => getGrossPrice(current) < getGrossPrice(lowest) ? current : lowest, shippingMethods.value[0]);

        await setShippingMethod({ id: cheapestMethod.id });
        await refreshCart();
    };

    return { preselectShippingMethodFallback };
}
