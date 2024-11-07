<script setup lang="ts">
withDefaults(
    defineProps<{
        value: string;
        headlineClasses?: string;
        contentClasses?: string;
        triggerClasses?: string;
    }>(),
    {
        headlineClasses: 'flex w-full items-center justify-between gap-4 px-4 py-2 bg-gray-light',
        contentClasses: 'px-4',
        triggerClasses: 'h-6 w-6'
    },
);
</script>

<template>
    <AccordionItem
        :value="value"
    >
        <AccordionHeader>
            <AccordionTrigger
                class="group"
                :class="[headlineClasses]"
            >
                <slot name="title" />

                <slot name="trigger">
                    <FormKitIcon
                        icon="chevron-down"
                        :class="triggerClasses"
                        class="block transition-transform duration-300 group-data-[state=open]:rotate-180"
                    />
                </slot>
            </AccordionTrigger>
        </AccordionHeader>

        <AccordionContent
            class="overflow-hidden transition-transform duration-300 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown"
        >
            <div :class="contentClasses">
                <slot name="content" />
            </div>
        </AccordionContent>
    </AccordionItem>
</template>
