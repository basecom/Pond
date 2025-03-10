<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { CalendarCell, type CalendarCellProps, useForwardProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<CalendarCellProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <CalendarCell
        :class="cn('relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-zinc-100 [&:has([data-selected][data-outside-view])]:bg-zinc-100/50 dark:[&:has([data-selected])]:bg-zinc-800 dark:[&:has([data-selected][data-outside-view])]:bg-zinc-800/50', props.class)"
        v-bind="forwardedProps"
    >
        <slot />
    </CalendarCell>
</template>
