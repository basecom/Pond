<script setup lang="ts">
const { accountBreadcrumbs } = useStaticBreadcrumbs();

useBreadcrumbs(accountBreadcrumbs("register"));
</script>

<template>
    <div class="flex w-full justify-center">
        <AccountRegister />
    </div>
</template>
