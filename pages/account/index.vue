<script setup lang="ts">
await useAuthentication().rerouteIfLoggedOut();

const { accountBreadcrumbs } = useStaticBreadcrumbs();
useBreadcrumbs(accountBreadcrumbs({}));

const showLatestOrder = ref(true);
</script>

<template>
    <Account>
        <AccountOverviewContent :show-latest-order="showLatestOrder" />
    </Account>
</template>
