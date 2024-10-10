<script setup lang="ts">
</script>

<template>
    <CheckoutConfirmCard :title="$t('checkout.confirm.terms.cardTitle')">
        <FormKit
            type="checkbox"
            :label="$t('checkout.confirm.terms.label')"
            :help="$t('account.order.edit.terms.help')"
            name="terms"
            decorator-icon="check"
            :value="true"
            :disabled="true"
            validation="accepted"
            validation-visibility="submit"
        />
    </CheckoutConfirmCard>
</template>
