<script setup lang="ts">
await useAuthentication().rerouteIfLoggedOut();

const { accountBreadcrumbs } = useStaticBreadcrumbs();
const showLatestOrder = ref(true);

useBreadcrumbs(accountBreadcrumbs({}));
useAnalytics({ trackPageView: true, pageType: 'account' });
</script>

<template>
    <Account>
        <AccountOverviewContent :show-latest-order="showLatestOrder" />
    </Account>
</template>
