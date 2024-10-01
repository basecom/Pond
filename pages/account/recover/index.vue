<script setup lang="ts">
const { accountBreadcrumbs } = useStaticBreadcrumbs();

useBreadcrumbs(accountBreadcrumbs({ type: 'recover' }));
</script>

<template>
    <div class="flex w-full justify-center">
        <div class="w-128">
            <AccountResetPassword />
        </div>
    </div>
</template>
