export type OrderForm = {
    customerComment: string | undefined;
    terms: boolean;
    billingAddressSameAsShippingAddress: boolean;
    promotion: PromotionCodeForm;
    shippingMethod: string;
    paymentMethod: string;
};

export type PromotionCodeForm = {
    promotionCode: string | null;
};
