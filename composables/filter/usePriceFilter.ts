import type { LocationQueryRaw } from '#vue-router';
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilterMapping } from '../../types/listing/mapping';

export function usePriceFilter(): ListingFilterMapping {
    const encodeUrl = (value: Schemas['ProductListingCriteria']): LocationQueryRaw => {
        if (!value['min-price'] || !value['max-price']) {
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
    ): Partial<Schemas['ProductListingCriteria']> => {
        return {
            'min-price': value.price.min,
            'max-price': value.price.max,
        };
    };

    const isSameCriteria = (
        a: Partial<Schemas['ProductListingCriteria']>,
        b: Partial<Schemas['ProductListingCriteria']>,
    ): boolean => {
        return a['min-price'] === b['min-price'] && a['max-price'] === b['max-price'];
    };

    const removeFilter = (
        currentFilters: ComputedRef<Schemas['ProductListingResult']['currentFilters']>,
    ) => {
        currentFilters.value['price']= {
            max: null,
            min: null,
        }
    }

    return {
        encodeUrl,
        decodeUrl,
        createCriteria,
        isSameCriteria,
        removeFilter
    };
}
