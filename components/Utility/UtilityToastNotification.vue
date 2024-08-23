<script setup lang="ts">
import type { Notification } from "@shopware-pwa/composables-next";

const { removeOne } = useNotifications();

const props = defineProps<{
    notification: Notification;
}>();

const backgroundMap = {
    info: "bg-status-info",
    success: "bg-status-success",
    warning: "bg-status-warning",
    danger: "bg-status-danger",
};

const borderMap = {
    info: "border-status-info",
    success: "border-status-success",
    warning: "border-status-warning",
    danger: "border-status-danger",
};

const iconMap = {
    info: "info",
    success: "check",
    warning: "triangle-exclamation",
    danger: "ban",
};

const background = computed(() => backgroundMap[props.notification.type] || "background-status-info");
const border = computed(() => borderMap[props.notification.type] || "border-status-info");
const icon = computed(() => iconMap[props.notification.type] || "information");
</script>

<template>
    <ToastRoot
        :key="notification.id"
        :duration="notification.persistent ? Infinity : notification.timeout"
        :class="border"
        class="flex border bg-white rounded-md shadow-lg p-3 gap-x-4 items-center data-[state=open]:animate-slideIn data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
    >
        <div>
            <FormKitIcon :icon="icon" class="block h-7 w-7 rounded-md text-white p-1.5" :class="background" />
        </div>

        <ToastTitle v-if="notification.title">
            {{ notification.title }}
        </ToastTitle>

        <ToastDescription class="text-sm leading-4">
            {{ notification.message }}
        </ToastDescription>

        <ToastClose class="ml-auto hover:bg-gray-medium hover:ring-gray-medium hover:ring-4 hover:rounded-md" @click="removeOne(notification.id)">
            <FormKitIcon icon="xmark" class="block h-4 w-4 text-gray-dark" />
        </ToastClose>
    </ToastRoot>
</template>