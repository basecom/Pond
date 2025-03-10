<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { CalendarCellTrigger, type CalendarCellTriggerProps, useForwardProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <CalendarCellTrigger
        :class="cn(
            buttonVariants({ variant: 'ghost' }),
            'h-8 w-8 p-0 font-normal',
            '[&[data-today]:not([data-selected])]:bg-gray-100 [&[data-today]:not([data-selected])]:text-gray-900',
            // Selected
            'data-[selected]:bg-gray-900 data-[selected]:text-gray-50 data-[selected]:opacity-100 data-[selected]:hover:bg-gray-900 data-[selected]:hover:text-gray-50 data-[selected]:focus:bg-gray-900 data-[selected]:focus:text-gray-50',
            // Disabled
            'data-[disabled]:text-gray-500 data-[disabled]:opacity-50',
            // Unavailable
            'data-[unavailable]:text-gray-50 data-[unavailable]:line-through',
            // Outside months
            'data-[outside-view]:text-gray-500 data-[outside-view]:opacity-50 [&[data-outside-view][data-selected]]:bg-gray-100/50 [&[data-outside-view][data-selected]]:text-gray-500 [&[data-outside-view][data-selected]]:opacity-30',
            props.class,
        )"
        v-bind="forwardedProps"
    >
        <slot />
    </CalendarCellTrigger>
</template>
