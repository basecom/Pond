export type AddressForm = {
    street: string;
    zipcode: string;
    city: string;
    countryId: string;
};

export type BillingAddressForm = {
    salutationId: string;
    firstName: string;
    lastName: string;
    billingAddress: AddressForm;
};
