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
                $t('checkout.confirm.personal.loggedInMessage', {
                    firstname: customerStore.customer.firstName,
                    lastname: customerStore.customer.lastName,
                })
            }}
            <UtilityPill
                v-if="customerStore.customer.guest"
                content="guest"
                class="max-w-fit px-1.5"
            />
        </span>

        <template v-else>
            <AccountLoginRegisterTabs :allow-guest="true" />
        </template>
    </CheckoutConfirmCard>
</template>
