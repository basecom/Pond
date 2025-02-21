import type { Schemas } from '@shopware/api-client/api-types';

export type CmsSlotConfig = {
    config: {
        minHeight: {
            value: string;
        }
    }
} & Schemas['CmsSlot'];
