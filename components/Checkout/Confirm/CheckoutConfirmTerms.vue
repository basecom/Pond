<script setup lang="ts">
const tos = ref(false);
</script>

<template>
    <CheckoutConfirmCard :title="$t('checkout.confirm.terms.cardTitle')">
        <FormKit
            type="checkbox"
            :label="$t('checkout.confirm.termsInput.label')"
            :help="$t('checkout.confirm.termsInput.help')"
            name="terms"
            decorator-icon="check"
            :value="tos"
            validation="accepted"
            validation-visibility="submit"
        />
    </CheckoutConfirmCard>
</template>
