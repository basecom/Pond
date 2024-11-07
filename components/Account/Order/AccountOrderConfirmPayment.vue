<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    paymentMethod: Schemas['PaymentMethod'];
}>();
const emit = defineEmits<{
    'update-method': [key: string];
}>();

const { paymentMethods, getPaymentMethods } = useCheckout();

const selectedPaymentMethod = computed({
    get(): string {
        return props.paymentMethod?.id || '';
    },
    set(paymentMethodId: string) {
        emit('update-method', paymentMethodId);
    },
});

const paymentOptions = ref([]);

onMounted(async () => {
    await getPaymentMethods();

    paymentOptions.value = paymentMethods.value.map(method => ({
        label: method.translated.name,
        value: method.id,
        description: method.translated.description,
        mediaUrl: method.media?.url,
    }));
});
</script>

<template>
    <CheckoutConfirmCard
        :title="$t('checkout.confirm.payment.cardTitle')"
        :subtitle="$t('checkout.confirm.payment.cardSubtitle')"
    >
        <FormKit
            v-if="paymentOptions.length > 0"
            v-model="selectedPaymentMethod"
            type="radio"
            :options="paymentOptions"
        >
            <template #label="{ option }">
                <CheckoutConfirmPaymentMethod
                    :label="option.label"
                    :description="option.description"
                    :media-url="option.mediaUrl"
                />
            </template>
        </FormKit>
    </CheckoutConfirmCard>
</template>
