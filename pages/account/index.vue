<script setup lang="ts">
useAuth().authenticate();

const { accountBreadcrumbs } = useStaticBreadcrumbs();
useBreadcrumbs(accountBreadcrumbs({}));
</script>

<template>
    <Account>
        <AccountOverviewContent />
    </Account>
</template>
