<script setup lang="ts">
useAuthentication().authenticate();

const { accountBreadcrumbs } = useStaticBreadcrumbs();
useBreadcrumbs(accountBreadcrumbs({}));

const showLatestOrder = ref(true);
</script>

<template>
    <Account>
        <AccountOverviewContent :show-latest-order="showLatestOrder"/>
    </Account>
</template>
