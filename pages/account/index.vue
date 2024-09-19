<script setup lang="ts">
const { accountBreadcrumbs } = useStaticBreadcrumbs();

useBreadcrumbs(accountBreadcrumbs({}));
</script>

<template>
    <layout-account>
        <overview-content />
    </layout-account>
</template>
