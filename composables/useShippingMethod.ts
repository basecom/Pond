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

        const cheapestMethod : Schemas['ShippingMethod'] = shippingMethods.value.reduce((lowest: Schemas['ShippingMethod'], current: Schemas['ShippingMethod']) => {
            const currentGross = current.prices?.[0]?.currencyPrice?.[0]?.gross ?? 0;
            const lowestGross = lowest.prices?.[0]?.currencyPrice?.[0]?.gross ?? 0;

            return currentGross < lowestGross ? current : lowest;
        });

        await setShippingMethod({ id: cheapestMethod.id });
        await refreshCart();
    };

    return { preselectShippingMethodFallback };
}
