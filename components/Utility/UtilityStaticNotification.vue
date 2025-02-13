<script setup lang="ts">
import type { Notification } from '@shopware-pwa/composables-next';
import type { NotificationType } from '~/types/NotificationType';

const props = withDefaults(
    defineProps<{
      type:  NotificationType;
      message: string;
      id?: number;
    }>(),
    {
      id: Math.floor((Math.random() * 100) + 1)
    },
);


const staticNotification: Notification = {
    type: props.type,
    message: props.message,
    id: props.id,
};
</script>

<template>
    <UtilityToastNotification :notification="staticNotification" :persistent="true" />
</template>
