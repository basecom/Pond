import { useOrderDetails as useBaseOrderDetails } from '@shopware-pwa/composables-next';
import type { UseOrderDetailsReturn } from '@shopware-pwa/composables-next';
import type { Schemas } from '@shopware/api-client/api-types';
import { computed } from 'vue';

export function useOrderDetails(
    orderId: string,
    associations?: Schemas["Criteria"]["associations"],
): UseOrderDetailsReturn {
    const baseUserDetails = useBaseOrderDetails(orderId, associations);
    const paymentMethod = computed(() => {
        const transaction = baseUserDetails.order.value?.transactions;

        return transaction?.[transaction.length - 1]?.paymentMethod;
    });

    return {
        ...baseUserDetails,
        paymentMethod,
    };
}