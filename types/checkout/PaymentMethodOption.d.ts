import type { Schemas } from '@shopware/api-client/api-types';

export type PaymentMethodOption = {
    label: string;
    value: string;
    description?: string;
    media: Schemas['Media']|null;
};
