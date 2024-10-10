<script setup lang="ts">
await useAuthentication().rerouteIfLoggedOut();
</script>

<template>
    <Account>
        <AccountPaymentContent />
    </Account>
</template>
