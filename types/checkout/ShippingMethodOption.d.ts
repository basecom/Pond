import type { PaymentMethodOption } from '~/types/checkout/paymentMethodOption';

export type ShippingMethodOption = {
    description?: string;
} & PaymentMethodOption;
