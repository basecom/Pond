import type { Schemas } from '@shopware/api-client/api-types';
import { useCart, useCheckout } from "#build/imports";

export function useShippingMethod() {

    const preselectShippingMethod = async () => {
        const { getShippingMethods, setShippingMethod, selectedShippingMethod } = useCheckout();
        const { refreshCart } = useCart();

        const shippingMethods = await getShippingMethods();

        const isPreselectedShippingAvailable = shippingMethods.value.find((method: Schemas['ShippingMethod']) => method.id === selectedShippingMethod.value.id);

        if (isPreselectedShippingAvailable) {
            return;
        }

        const cheapestMethod = shippingMethods.value.reduce((lowest : Schemas['ShippingMethod'], current: Schemas['ShippingMethod']) => {
            return current.prices?.[0].currencyPrice?.[0].gross < lowest.prices?.[0].currencyPrice?.[0].gross ? current : lowest;
        });

        await setShippingMethod({id: cheapestMethod.id});
        await refreshCart();
    }

    return { preselectShippingMethod };
}