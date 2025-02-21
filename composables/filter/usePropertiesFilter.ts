import type { LocationQueryRaw } from '#vue-router';
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilterMapping } from '~/types/listing/FilterMapping';

export function usePropertiesFilter(): ListingFilterMapping {
    const encodeUrl = (value: Schemas['ProductListingCriteria']|undefined): LocationQueryRaw => {
        if (!value?.properties) {
            return {
                properties: undefined,
            };
        }

        return {
            properties: value.properties,
        };
    };

    const decodeUrl = (value: LocationQueryRaw): Partial<Schemas['ProductListingCriteria']> => {
        const properties = value['properties'];

        if (properties === undefined) {
            return {
                properties: undefined,
            };
        }

        const propertiesValue = String(properties);

        return {
            properties: propertiesValue,
        };
    };

    const createCriteria = (
        value: Schemas['ProductListingResult']['currentFilters'],
    ): Partial<Schemas['ProductListingCriteria']> => ({
        properties: value.properties.length > 0 ? value.properties.join('|') : undefined,
    });

    const isSameCriteria = (
        a: Partial<Schemas['ProductListingCriteria']>,
        b: Partial<Schemas['ProductListingCriteria']>,
    ): boolean => a['properties'] === b['properties'];

    const removeFilter = (currentFilters: Schemas['ProductListingResult']['currentFilters'], toRemove: Schemas['PropertyGroupOption']['id']) => {
        const index = currentFilters.properties.indexOf(toRemove);
        if (index < 0) {
            return;
        }

        currentFilters.properties.splice(index, 1);
    };

    return {
        encodeUrl,
        decodeUrl,
        createCriteria,
        isSameCriteria,
        removeFilter,
    };
}
