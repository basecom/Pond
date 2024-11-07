<script setup lang="ts">
await useAuthentication().rerouteIfLoggedOut();

useAnalytics({ trackPageView: true, pageType: 'accountAddress' });
</script>

<template>
    <Account>
        <AccountAddressContent />
    </Account>
</template>
