<script setup lang="ts">
await useAuthentication().rerouteIfLoggedOut();
</script>

<template>
    <Account>
        <AccountOrderContent />
    </Account>
</template>
