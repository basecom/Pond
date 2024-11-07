<script setup lang="ts">
await useAuthentication().rerouteIfLoggedOut();

useAnalytics({ trackPageView: true, pageType: 'accountOrders' });
</script>

<template>
    <Account>
        <AccountOrderContent />
    </Account>
</template>
