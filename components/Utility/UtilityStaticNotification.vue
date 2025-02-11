<script setup lang="ts">
import type { Notification } from '@shopware-pwa/composables-next';
import type { NotificationType } from '~/types/notificationType';

const props = defineProps<{
    type:  NotificationType;
    message: string;
    id: number;
}>();

const staticNotification: Notification = {
    type: props.type,
    message: props.message,
    id: props.id,
};
</script>

<template>
    <UtilityToastNotification :notification="staticNotification" :persistent="true" />
</template>
