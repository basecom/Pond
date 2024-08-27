<script setup lang="ts">
/**
 * example usage:
 * <SharedAccordionRoot default-value="item-1">
 *     <SharedAccordionItem value="item-1">
 *         <template #title>description</template>
 *         <template #content>display content for item 1</template>
 *     </SharedAccordionItem>
 *     <SharedAccordionItem value="item-2">
 *         <template #title>Item 2</template>
 *         <template #content>display content for item 2</template>
 *     </SharedAccordionItem>
 * </SharedAccordionRoot>
 */
withDefaults(
    defineProps<{
        defaultValue: string;
        collapsible?: boolean;
        type?: 'single' | 'multiple';
    }>(),
    {
        collapsible: true,
        type: 'single',
    },
);
</script>

<template>
    <AccordionRoot
        :default-value="defaultValue"
        type="single"
        :collapsible="true"
    >
        <slot></slot>
    </AccordionRoot>
</template>
