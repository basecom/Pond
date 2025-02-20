import type { Schemas } from '@shopware/api-client/api-types';

export type ListingFilter = ListingPropertyFilter|ListingPriceFilter;

export type ListingPropertyFilter = {
    code: 'properties';
    label: string;
} & Schemas['PropertyGroup'];

export type ListingPriceFilter = {
    apiAlias: 'price_aggregation',
    code: 'price',
    label: 'price',
    avg: number,
    max: number,
    min: number,
    name: 'price',
    sum: number,
};
