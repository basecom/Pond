<script setup lang="ts">
import type { Notification } from "@shopware-pwa/composables-next";

const props = defineProps<{
    type: string;
    message: string;
    id: string;
}>();

const staticNotification: Notification = {
    type: props.type,
    message: props.message,
    id: props.id,
    static: true
}
</script>

<template>
    <UtilityToastNotification :notification="staticNotification" />
</template>