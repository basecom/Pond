<script setup lang="ts">
import type { Notification } from '@shopware-pwa/composables-next';

const props = withDefaults(
    defineProps<{
      notification: Notification;
      persistent?: boolean;
    }>(),
    {
        persistent: false,
    },
);

const { removeOne } = useNotifications();

const iconMap = {
    info: 'info',
    success: 'check',
    warning: 'triangle-exclamation',
    danger: 'ban',
};

const icon = computed(() => iconMap[props.notification.type] || 'information');
</script>

<template>
    <div
        v-if="notification.message.length > 0"
        :id="`toast-${notification.id}`"
        class="flex items-center gap-x-4 rounded-md border bg-white p-3 shadow-lg"
        :class="{
            'border-status-info': notification.type === 'info',
            'border-status-success': notification.type === 'success',
            'border-status-important': notification.type === 'warning',
            'border-status-danger': notification.type === 'danger',
        }"
        role="alert"
    >
        <FormKitIcon
            :icon="icon"
            class="block size-7 shrink-0 rounded-md p-1.5 text-white"
            :class="{
                'bg-status-info': notification.type === 'info',
                'bg-status-success': notification.type === 'success',
                'bg-status-important': notification.type === 'warning',
                'bg-status-danger': notification.type === 'danger',
            }"
        />

        <div class="leading-4">
            {{ notification.message }}
        </div>

        <template v-if="persistent">
            <button
                type="button"
                class="ml-auto hover:rounded-md hover:bg-gray-medium hover:ring-4 hover:ring-gray-medium"
                :data-dismiss-target="`toast-${notification.id}`"
                :aria-label="$t('utility.toast.closeButtonAriaLabel')"
                @click="removeOne(notification.id)"
            >
                <FormKitIcon
                    icon="xmark"
                    class="block size-4 text-gray-dark"
                />
            </button>
        </template>
    </div>
</template>
