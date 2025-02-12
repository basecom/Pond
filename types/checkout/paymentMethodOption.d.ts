import type {Schemas} from "@shopware/api-client/api-types";

export type ShippingMethodOption = {
    label: string;
    value: string;
    deliveryTime?: string;
    description?: string;
    media: Schemas['Media']|null;
};
