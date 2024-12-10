<script setup lang="ts">
await useAuthentication().rerouteIfLoggedIn();

const { accountBreadcrumbs } = useStaticBreadcrumbs();

useBreadcrumbs(accountBreadcrumbs({ type: 'register' }));
useAnalytics({ trackPageView: true, pageType: 'register' });
</script>

<template>
    <div class="container flex w-full justify-center">
        <AccountRegister :redirect-after-success="true" />
    </div>
</template>
