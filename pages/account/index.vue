<script setup lang="ts">
const customerStore = useCustomerStore();
const { accountBreadcrumbs } = useStaticBreadcrumbs();

const handleLogout = async () => {
    await customerStore.logout();
    navigateTo('/');
};

useBreadcrumbs(accountBreadcrumbs({}));
</script>

<template>
    <div class="container">
        <h1>{{ $t('account.overview.heading') }}</h1>
        <template v-if="customerStore.customer">
            {{
                $t('account.overview.greeting', {
                    firstname: customerStore.customer.firstName,
                    lastname: customerStore.customer.lastName,
                })
            }}
        </template>
        <FormKit
            type="submit"
            prefix-icon="right-from-bracket"
            @click.prevent="handleLogout"
        >
            {{ $t('account.logout.buttonLabel') }}
        </FormKit>
    </div>
</template>
