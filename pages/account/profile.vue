<script setup lang="ts">
await useAuthentication().rerouteIfLoggedOut();

useAnalytics({ trackPageView: true, pageType: 'accountProfile' });
</script>

<template>
    <Account>
        <AccountProfileContent />
    </Account>
</template>
