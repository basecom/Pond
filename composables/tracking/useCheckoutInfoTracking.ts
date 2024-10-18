import type { Schemas } from '@shopware/api-client/api-types';

export function useCheckoutInfoTracking() {
    const { sessionContext } = useSessionContext();

    const getShippingInfo = (): string => {
        const shippingMethod: Schemas['ShippingMethod'] | undefined = sessionContext.value?.shippingMethod;
        return shippingMethod?.name || '';
    };

    const getPaymentInfo = (): string => {
        const paymentMethod: Schemas['PaymentMethod'] | undefined = sessionContext.value?.paymentMethod;
        return paymentMethod?.name || '';
    };

    return {
        getShippingInfo,
        getPaymentInfo,
    };
}
