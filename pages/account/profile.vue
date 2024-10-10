<script setup lang="ts">
await useAuthentication().rerouteIfLoggedOut();
</script>

<template>
    <Account>
        <AccountProfileContent />
    </Account>
</template>
