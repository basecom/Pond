export const preselectShippingMethod = async () => {
    const { getShippingMethods, setShippingMethod, selectedShippingMethod } = useCheckout();
    const { refreshCart } = useCart();

    const shippingMethods = await getShippingMethods();

    const isPreselectedShippingAvailable = shippingMethods.value.find(method => method.id === selectedShippingMethod.id);

    if (isPreselectedShippingAvailable) {
        return;
    }

    const cheapestMethod = shippingMethods.value.reduce((lowest, current) => {
        return current.prices[0].currencyPrice[0].gross < lowest.prices[0].currencyPrice[0].gross ? current : lowest;
    });

    await setShippingMethod({id: cheapestMethod.id});
    await refreshCart();
}