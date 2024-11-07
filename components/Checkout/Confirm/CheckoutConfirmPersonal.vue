<script setup lang="ts">
const customerStore = useCustomerStore();
</script>

<template>
    <CheckoutConfirmCard :title="$t('checkout.confirm.personal.cardTitle')">
        <span
            v-if="customerStore.customer"
            class="flex gap-2 text-sm"
        >
            {{
                $t('checkout.confirm.personal.loggedInMessage', {
                    firstname: customerStore.customer.firstName,
                    lastname: customerStore.customer.lastName,
                })
            }}
            <UtilityBadge
                v-if="customerStore.customer.guest"
                :content="$t('account.register.guest.label')"
                size="sm"
                class="max-w-fit px-1.5"
            />
        </span>

        <template v-else>
            <AccountLoginRegisterTabs :allow-guest="true" />
        </template>
    </CheckoutConfirmCard>
</template>
