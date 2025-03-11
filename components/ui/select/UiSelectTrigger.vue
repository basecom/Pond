<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-vue-next';
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <SelectTrigger
        v-bind="forwardedProps"
        :class="cn(
            'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-white data-[placeholder]:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start',
            props.class,
        )"
    >
        <slot />
        <SelectIcon as-child>
            <ChevronDown class="size-4 shrink-0 opacity-50" />
        </SelectIcon>
    </SelectTrigger>
</template>
