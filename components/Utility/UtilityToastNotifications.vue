<script setup lang="ts">
const { notifications } = useNotifications();
</script>

<template>
    <div class="fixed bottom-10 right-5 z-[2147483647] flex max-h-fit w-96 max-w-[calc(100vw-2.5rem)] flex-col gap-2.5">
        <UtilityToastNotification
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
        />
    </div>
</template>
