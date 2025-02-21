<script setup lang="ts">
import type { PromotionCodeForm } from '~/types/form/CheckoutForm';
import type { CartErrors } from '~/types/checkout/CartErrors';

const { addPromotionCode, consumeCartErrors } = useCart();
const { pushError, pushSuccess } = useNotifications();
const { handleError } = useHandleError();
const { t } = useI18n();

const cartErrors = ref<CartErrors|null>(null);

const addPromotion = async (promotionCodeForm: PromotionCodeForm) => {
    if (!promotionCodeForm.promotionCode) {
        return;
    }

    try {
        const response = await addPromotionCode(promotionCodeForm.promotionCode);
        if (response.errors) {
            cartErrors.value = consumeCartErrors();
            return;
        }

        pushSuccess(t('checkout.promotion.successMessage', { promotionCode: promotionCodeForm.promotionCode }));
    } catch (error) {
        handleError(error);
        pushError(t('checkout.promotion.errorMessage'));
    }
};
</script>

<template>
    <ul
        v-if="cartErrors && cartErrors['promotion-not-found']"
        class="validation-errors text-status-danger"
    >
        <li>
            {{ cartErrors['promotion-not-found'].message }}
        </li>
    </ul>
    <FormKit
        type="form"
        :submit-label="$t('checkout.promotion.submitLabel')"
        :classes="{
            form: 'w-full flex flex-row gap-4',
        }"
        name="promotion"
        @submit="addPromotion"
    >
        <FormKit
            type="text"
            :label="$t('checkout.promotion.code.label')"
            name="promotionCode"
            required="true"
            :classes="{
                outer: 'flex-grow',
            }"
        />
    </FormKit>
</template>
