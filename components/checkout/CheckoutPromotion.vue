<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

type FormkitPromotionFields = {
    promotionCode: string;
};

const {addPromotionCode, consumeCartErrors} = useCart()
const { pushError, pushSuccess } = useNotifications();

const cartErrors = ref<Schemas["Cart"]["errors"]>([]);

const handleSubmit = async (fields: FormkitPromotionFields) => {
    try {
        const response = await addPromotionCode(fields['promotionCode'])
        if (response.errors) {
            cartErrors.value = consumeCartErrors()
            return;
        }

        pushSuccess(`Promotion code ${fields['promotionCode']} was added`);

    } catch (e) {
        console.error(e);

        pushError('Something went wrong!')
    }
}
</script>

<template>
    <ul
        v-if="cartErrors && cartErrors['promotion-not-found']"
        class="validation-errors text-status-danger"
    >
        <li
        >
            {{ cartErrors['promotion-not-found'].message }}
        </li>
    </ul>
    <FormKit
        type="form"
        @submit="handleSubmit"
    >
        <FormKit
            type="text"
            label="promotion code"
            name="promotionCode"
            required="true"
        />
    </FormKit>
</template>

<style scoped>

</style>