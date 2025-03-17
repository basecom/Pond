<script setup lang="ts">
import type { PaymentMethodOption } from '~/types/checkout/PaymentMethodOption';

const { paymentMethods, getPaymentMethods } = useCheckout();

const { selectedPaymentMethod: paymentMethod, setPaymentMethod } = useSessionContext();
const { trackAddPaymentInfo } = useAnalytics();
const { refreshCart } = useCart();

const selectedPaymentMethod = computed({
    get(): string {
        return paymentMethod.value?.id || '';
    },
    async set(paymentMethodId: string) {
        if (paymentMethodId === paymentMethod.value?.id) {
            return;
        }
        await setPaymentMethod({ id: paymentMethodId });
        trackAddPaymentInfo();
        await refreshCart();
    },
});

const paymentOptions: Ref<PaymentMethodOption[]|null> = ref(null);

onMounted(async () => {
    await getPaymentMethods();

    paymentOptions.value = paymentMethods.value.map(method => ({
        label: method.translated.name,
        value: method.id,
        description: method.translated.description,
        media: method.media,
    } as PaymentMethodOption));

    trackAddPaymentInfo();
});
</script>

<template>
    <CheckoutConfirmCard
        :title="$t('checkout.confirm.payment.cardTitle')"
        :subtitle="$t('checkout.confirm.payment.cardSubtitle')"
    >
        <FormKit
            v-if="paymentOptions?.length"
            v-model="selectedPaymentMethod"
            type="radio"
            name="paymentMethod"
            :options="paymentOptions"
            fieldset-class="w-full"
            wrapper-class="w-full !mb-5 !items-start"
            decorator-class="mt-1"
        >
            <template #label="{ option }">
                <CheckoutConfirmPaymentMethod
                    :label="option.label"
                    :description="option.description"
                    :media="option.media"
                />
            </template>
        </FormKit>
    </CheckoutConfirmCard>
</template>
