import type { Schemas } from '@shopware/api-client/api-types';

export type ListingFilter<ENTITY = unknown> = {
    code: keyof Schemas['ProductListingResult']['currentFilters'];
    label: string;
} & ENTITY;
