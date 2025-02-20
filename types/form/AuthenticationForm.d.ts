import type { AddressForm, BillingAddressForm } from '~/types/form/AddressForm';

export type RegisterForm = {
    showAlternativeShippingAddress: boolean;
    guest?: boolean;
    email: string;
    password: string;
    terms: boolean;
    alternativeShippingAddress: {
        showAlternativeShippingAddress: boolean;
        salutationId?: string;
        firstName?: string;
        lastName?: string;
        shippingAddress?: AddressForm;
    }
} & BillingAddressForm;

export type LoginForm = {
    username: string;
    password: string;
};
