<script setup lang="ts">
withDefaults(
    defineProps<{
        defaultValue: string;
        collapsible?: boolean;
        type?: 'single'|'multiple';
    }>(),
    {
        collapsible: true,
        type: 'single',
    }
)
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