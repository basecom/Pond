<script setup lang="ts">

defineProps<{
    value: string;
}>();
</script>

<template>
    <AccordionItem :value="value" class="py-2">
        <AccordionHeader>
            <AccordionTrigger class="w-full flex gap-4 justify-between items-center bg-gray-light px-4 py-2 group">
                <span class="font-bold text-xl">
                    <slot name="title" />
                </span>
                <FormKitIcon
                    icon="chevron-down"
                    class="block h-4 w-4 text-gray transition-transform duration-300 group-data-[state=open]:rotate-180"
                />
            </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="transition-transform duration-300 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
            <div class=" px-4 pt-2">
                <slot name="contet"/>
            </div>
        </AccordionContent>
    </AccordionItem>
</template>

<style scoped>

</style>