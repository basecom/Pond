export type AddressForm = {
    street: string;
    zipcode: string;
    city: string;
    countryId: string;
    company?: string;
};

export type BillingAddressForm = {
    salutationId: string;
    firstName: string;
    lastName: string;
    billingAddress: AddressForm;
};

export type ShippingAddressForm = {
    salutationId: string;
    firstName: string;
    lastName: string;
    shippingAddress: AddressForm;
};
