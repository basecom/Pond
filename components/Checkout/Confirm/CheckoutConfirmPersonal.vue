<script setup lang="ts">
const customerStore = useCustomerStore();
</script>

<template>
    <CheckoutConfirmCard :title="$t('checkout.confirm.personal.cardTitle')">
        <span
            v-if="customerStore.customer"
            class="text-sm"
        >
            {{
                $t('checkout.confirm.personal.loggedInInfo', {
                    firstname: customerStore.customer.firstName,
                    lastname: customerStore.customer.lastName,
                })
            }}
        </span>

        <template v-else>
            <AccountLoginRegisterTabs />
        </template>
    </CheckoutConfirmCard>
</template>
