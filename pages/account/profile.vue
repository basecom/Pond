<script setup lang="ts">
useAuth().authenticate();
</script>

<template>
    <Account>
        <AccountProfileContent />
    </Account>
</template>
