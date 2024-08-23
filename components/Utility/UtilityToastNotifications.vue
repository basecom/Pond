<script setup lang="ts">
const { notifications } = useNotifications();
</script>

<template>
    <!-- Notifications get teleported to the position of ToastViewport in the DOM -->
    <ToastViewport class="fixed bottom-10 right-5 flex flex-col gap-[10px] w-[390px] max-h-fit max-w-[calc(100vw-2.5rem)] z-[2147483647]"/>

    <div>
        <UtilityToastNotification
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
        />
    </div>
</template>