<script setup lang="ts">
await useAuthentication().rerouteIfLoggedOut();
</script>

<template>
    <Account>
        <AccountAddressContent />
    </Account>
</template>
