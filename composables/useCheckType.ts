import type { ListingPriceFilter, ListingPropertyFilter, ListingFilter } from '~/types/listing/Filter';
import type { BillingAddressForm, ShippingAddressForm } from '~/types/form/AddressForm';

export function useCheckType() {
    // use a unique parameter for the type check

    const isPropertyFilter = (filter: ListingFilter): filter is ListingPropertyFilter => (filter as ListingPropertyFilter).visibleOnProductDetailPage !== undefined;
    const isPriceFilter = (filter: ListingFilter): filter is ListingPriceFilter => (filter as ListingPriceFilter).sum !== undefined;
    const isShippingAddressForm = (form: any): form is ShippingAddressForm => (form as ShippingAddressForm).shippingAddress !== undefined;

    return {
        isPropertyFilter,
        isPriceFilter,
        isShippingAddressForm,
    };
}
