<script setup lang="ts">
const { accountBreadcrumbs } = useStaticBreadcrumbs();

useBreadcrumbs(accountBreadcrumbs({ type: 'register' }));
</script>

<template>
    <div class="flex w-full justify-center">
        <AccountRegister :redirect-after-success="true" />
    </div>
</template>
