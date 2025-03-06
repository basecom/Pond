import { components } from '@shopware/api-client/api-types/storeApiTypes.overrides';

export type CustomerRegisterParams = {
    [key: string]: string | boolean | components["schemas"]["CustomerAddress"]
                   | Omit<components["schemas"]["CustomerAddress"], "createdAt" | "id" | "customerId" | "firstName" | "lastName">;
}