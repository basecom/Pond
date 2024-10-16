<script setup lang="ts">
await useAuthentication().rerouteIfLoggedIn();

const { accountBreadcrumbs } = useStaticBreadcrumbs();

useBreadcrumbs(accountBreadcrumbs({ type: 'register' }));
useAnalytics({ trackPageView: true, pageType: 'register' });
</script>

<template>
    <div class="flex w-full justify-center">
        <AccountRegister />
    </div>
</template>
