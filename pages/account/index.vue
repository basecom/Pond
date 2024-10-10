<script setup lang="ts">
await useAuthentication().rerouteIfLoggedOut();

const { accountBreadcrumbs } = useStaticBreadcrumbs();
useBreadcrumbs(accountBreadcrumbs({}));
</script>

<template>
    <Account>
        <AccountOverviewContent />
    </Account>
</template>
