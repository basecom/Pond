<script setup lang="ts">
useAuth().authenticate();
</script>

<template>
    <Account>
        <AccountPaymentContent />
    </Account>
</template>
