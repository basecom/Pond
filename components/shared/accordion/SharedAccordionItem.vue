<script setup lang="ts">
defineProps<{
    value: string;
}>();
</script>

<template>
    <AccordionItem
        :value="value"
        class="py-2"
    >
        <AccordionHeader>
            <AccordionTrigger class="group flex w-full items-center justify-between gap-4 bg-gray-light px-4 py-2">
                <span class="text-xl font-bold">
                    <slot name="title" />
                </span>
                <FormKitIcon
                    icon="chevron-down"
                    class="block h-4 w-4 text-gray transition-transform duration-300 group-data-[state=open]:rotate-180"
                />
            </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent
            class="overflow-hidden transition-transform duration-300 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown"
        >
            <div class="px-4 pt-2">
                <slot name="content" />
            </div>
        </AccordionContent>
    </AccordionItem>
</template>
