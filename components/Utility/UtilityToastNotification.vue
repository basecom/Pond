<script setup lang="ts">
import type { Notification } from "@shopware-pwa/composables-next";

const { removeOne } = useNotifications();

const props = defineProps<{
    notification: Notification;
}>();

const backgroundMap = {
    info: "bg-status-info",
    success: "bg-status-success",
    warning: "bg-status-important",
    danger: "bg-status-danger",
};

const borderMap = {
    info: "border-status-info",
    success: "border-status-success",
    warning: "border-status-important",
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
    <div
        v-if="notification.message.length > 0"
        :id="`toast-${notification.id}`"
        :class="border"
        class="flex border bg-white rounded-md shadow-lg p-3 gap-x-4 items-center"
        role="alert"
    >
        <FormKitIcon :icon="icon" class="block h-7 w-7 shrink-0 rounded-md text-white p-1.5" :class="background" />

        <div
            class="leading-4"
        >
            {{ notification.message }}
        </div>

        <template v-if="!notification.static">
            <button
                type="button"
                class="ml-auto hover:bg-gray-medium hover:ring-gray-medium hover:ring-4 hover:rounded-md"
                :data-dismiss-target="`toast-${notification.id}`"
                aria-label="Close notification"
                @click="removeOne(notification.id)"
            >
                <FormKitIcon icon="xmark" class="block h-4 w-4 text-gray-dark" />
            </button>
        </template>
    </div>
</template>