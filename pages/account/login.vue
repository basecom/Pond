<script setup lang="ts">
const { accountBreadcrumbs } = useStaticBreadcrumbs();

useBreadcrumbs(accountBreadcrumbs("login"));
</script>

<template>
    <div class="flex w-full justify-center">
        <div class="w-60">
            <AccountLogin :redirect-after-success="true" />
        </div>
    </div>
</template>
