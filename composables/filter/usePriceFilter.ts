import type { LocationQueryRaw } from '#vue-router';
import type { Schemas } from '@shopware/api-client/api-types';

export function usePriceFilter(): {
    encodeUrl: (value: (Schemas['ProductListingCriteria'] | undefined)) => LocationQueryRaw;
    decodeUrl: (value: LocationQueryRaw) => Partial<Schemas['ProductListingCriteria']>;
    createCriteria: (value: Schemas['ProductListingResult']['currentFilters']) => Partial<Schemas['ProductListingCriteria']>;
    isSameCriteria: (a: Partial<Schemas['ProductListingCriteria']>, b: Partial<Schemas['ProductListingCriteria']>) => boolean;
    removeFilter: (currentFilters: Schemas['ProductListingResult']['currentFilters'], id: string) => void
    } {
    const encodeUrl = (value: Schemas['ProductListingCriteria']|undefined): LocationQueryRaw => {
        if (!value || !value['min-price'] || !value['max-price']) {
            return {
                'min-price': undefined,
                'max-price': undefined,
            };
        }

        return {
            'min-price': value['min-price'].toString(),
            'max-price': value['max-price'].toString(),
        };
    };

    const decodeUrl = (value: LocationQueryRaw): Partial<Schemas['ProductListingCriteria']> => {
        const minPrice = value['min-price'];
        const maxPrice = value['max-price'];

        if (minPrice === undefined && maxPrice === undefined) {
            return {
                'min-price': undefined,
                'max-price': undefined,
            };
        }

        const minPriceValue = Number(minPrice);
        const maxPriceValue = Number(maxPrice);

        return {
            'min-price': !isNaN(minPriceValue) ? minPriceValue : undefined,
            'max-price': !isNaN(maxPriceValue) ? maxPriceValue : undefined,
        };
    };

    const createCriteria = (
        value: Schemas['ProductListingResult']['currentFilters'],
    ): Partial<Schemas['ProductListingCriteria']> => ({
        'min-price': value.price.min,
        'max-price': value.price.max,
    });

    const isSameCriteria = (
        a: Partial<Schemas['ProductListingCriteria']>,
        b: Partial<Schemas['ProductListingCriteria']>,
    ): boolean => a['min-price'] === b['min-price'] && a['max-price'] === b['max-price'];

    const removeFilter = (currentFilters: Schemas['ProductListingResult']['currentFilters']) => {
        currentFilters.price = {
            max: 0,
            min: 0,
        };
    };

    return {
        encodeUrl,
        decodeUrl,
        createCriteria,
        isSameCriteria,
        removeFilter,
    };
}
