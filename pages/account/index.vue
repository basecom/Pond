<script setup lang="ts">
useAuthentication().authenticate();

const { accountBreadcrumbs } = useStaticBreadcrumbs();
useBreadcrumbs(accountBreadcrumbs({}));
</script>

<template>
    <Account>
        <AccountOverviewContent />
    </Account>
</template>
