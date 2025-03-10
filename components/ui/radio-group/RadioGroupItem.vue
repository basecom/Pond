<script setup lang="ts">
import type { RadioGroupItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-vue-next';
import {
    RadioGroupIndicator,
    RadioGroupItem,

    useForwardProps,
} from 'reka-ui';
import { computed } from 'vue';

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <RadioGroupItem
        v-bind="forwardedProps"
        :class="
            cn(
                'peer aspect-square h-4 w-4 rounded-full border border-zinc-200 border-zinc-900 text-zinc-900 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:border-zinc-50 dark:text-zinc-50 dark:focus-visible:ring-zinc-300',
                props.class,
            )
        "
    >
        <RadioGroupIndicator class="flex items-center justify-center">
            <Check class="text-zinc-900 dark:text-zinc-50 size-3.5" />
        </RadioGroupIndicator>
    </RadioGroupItem>
</template>
