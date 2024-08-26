<script setup lang="ts">
const tos = ref(false);
</script>

<template>
    <CheckoutConfirmCard title="Terms and Conditions">
        <FormKit
            type="checkbox"
            label="Terms and Conditions"
            help="I have read and accepted the general terms and conditions."
            name="terms"
            decorator-icon="check"
            :value="tos"
            validation="accepted"
            validation-visibility="submit"
        />
    </CheckoutConfirmCard>
</template>
