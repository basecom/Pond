import { useOrderDetails as useBaseOrderDetails } from '@shopware-pwa/composables-next';
import type { UseOrderDetailsReturn } from '@shopware-pwa/composables-next';
import type { Schemas } from '@shopware/api-client/api-types';
import type { ComputedRef } from 'vue';

export type UseCustomOrderDetailsReturn = UseOrderDetailsReturn & {
    paymentState: ComputedRef<Schemas["StateMachineState"] | undefined>;
}

export function useOrderDetails(
    orderId: string,
    associations?: Schemas["Criteria"]["associations"],
): UseCustomOrderDetailsReturn {
    const baseUserDetails = useBaseOrderDetails(orderId, associations);
    const paymentMethod = computed(() => {
        const transactions = baseUserDetails.order.value?.transactions;

        return transactions?.[transactions.length - 1]?.paymentMethod;
    });

    const paymentState = computed(() => {
        const transactions = baseUserDetails.order.value?.transactions;

        return transactions?.[transactions.length - 1]?.stateMachineState;
    });

    return {
        ...baseUserDetails,
        paymentMethod,
        paymentState,
    };
}