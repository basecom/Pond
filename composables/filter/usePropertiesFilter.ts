import type { LocationQueryRaw } from '#vue-router';
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilterMapping } from '../../types/listing/mapping';
import { isString } from 'is-what';

export function usePropertiesFilter(): ListingFilterMapping {
    const encodeUrl = (value: Schemas['ProductListingCriteria']): LocationQueryRaw => {
        if (!value['properties']) {
            return {
                'properties': undefined,
            };
        }

        return {
            'properties': value['properties'],
        };
    };

    const decodeUrl = (value: LocationQueryRaw): Partial<Schemas['ProductListingCriteria']> => {
        const properties = value['properties'];

        if (properties === undefined) {
            return {
                'properties': undefined,
            };
        }

        const propertiesValue = String(properties);

        return {
            'properties': propertiesValue,
        };
    };

    const createCriteria = (
        value: Schemas['ProductListingResult']['currentFilters'],
    ): Partial<Schemas['ProductListingCriteria']> => {
        return {
            'properties': value.properties.join('|'),
        };
    };

    const isSameCriteria = (
        a: Partial<Schemas['ProductListingCriteria']>,
        b: Partial<Schemas['ProductListingCriteria']>,
    ): boolean => {
        return a['properties'] === b['properties'];
    };

    return {
        encodeUrl,
        decodeUrl,
        createCriteria,
        isSameCriteria,
    };
}
