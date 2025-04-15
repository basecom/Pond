<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ToastAction, type ToastActionProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ToastActionProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <ToastAction v-bind="delegatedProps" :class="cn('inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-gray-100/40 group-[.destructive]:hover:border-red-500/30 group-[.destructive]:hover:bg-red-500 group-[.destructive]:hover:text-gray-50 group-[.destructive]:focus:ring-red-500', props.class)">
        <slot />
    </ToastAction>
</template>
