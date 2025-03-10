<script setup lang="ts">
import { cn } from '@/lib/utils';
import { type AccordionItemProps, useForwardProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<AccordionItemProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <UiAccordionItem
        v-bind="forwardedProps"
        :class="cn('border-b', props.class)"
    >
        <slot />
    </UiAccordionItem>
</template>
