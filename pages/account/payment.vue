<script setup lang="ts">
await useAuthentication().rerouteIfLoggedOut();

useAnalytics({ trackPageView: true, pageType: 'accountPayment' });
</script>

<template>
    <Account>
        <AccountPaymentContent />
    </Account>
</template>
