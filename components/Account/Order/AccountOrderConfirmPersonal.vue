<script setup lang="ts">
const customerStore = useCustomerStore();
</script>

<template>
    <CheckoutConfirmCard :title="$t('checkout.confirm.personal.cardTitle')">
        <span class="text-sm">
            {{
                $t('checkout.confirm.personal.loggedInMessage', {
                    firstname: customerStore.customer.firstName,
                    lastname: customerStore.customer.lastName,
                })
            }}
        </span>
    </CheckoutConfirmCard>
</template>
