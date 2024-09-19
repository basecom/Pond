<script setup lang="ts">
const { accountBreadcrumbs } = useStaticBreadcrumbs();

useBreadcrumbs(accountBreadcrumbs({}));
</script>

<template>
    <Account>
        <AccountOverviewContent />
    </Account>
</template>
