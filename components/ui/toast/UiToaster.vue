<script setup lang="ts">
import { isVNode } from 'vue';
import { useToast } from './use-toast';

const { toasts } = useToast();
</script>

<template>
    <UiToastProvider>
        <UiToast v-for="toast in toasts" :key="toast.id" v-bind="toast">
            <div class="grid gap-1">
                <UiToastTitle v-if="toast.title">
                    {{ toast.title }}
                </UiToastTitle>
                <template v-if="toast.description">
                    <UiToastDescription v-if="isVNode(toast.description)">
                        <component :is="toast.description" />
                    </UiToastDescription>
                    <UiToastDescription v-else>
                        {{ toast.description }}
                    </UiToastDescription>
                </template>
                <UiToastClose />
            </div>
            <component :is="toast.action" />
        </UiToast>
        <UiToastViewport />
    </UiToastProvider>
</template>
