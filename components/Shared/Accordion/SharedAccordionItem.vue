<script setup lang="ts">
withDefaults(
    defineProps<{
        value: string;
        headlineClasses?: string;
        headlineDefaultTextStyle?: boolean;
    }>(),
    {
        headlineClasses: 'bg-gray-light',
        headlineDefaultTextStyle: true,
    },
);
</script>

<template>
    <AccordionItem
        :value="value"
        class="pt-2"
    >
        <AccordionHeader>
            <AccordionTrigger
                class="group flex w-full items-center justify-between gap-4 px-4 py-2"
                :class="[headlineClasses]"
            >
                <span
                    :class="{
                        'text-xl font-bold': headlineDefaultTextStyle,
                    }"
                >
                    <slot name="title" />
                </span>
                <slot name="trigger">
                    <FormKitIcon
                        icon="chevron-down"
                        class="block h-4 w-4 text-gray transition-transform duration-300 group-data-[state=open]:rotate-180"
                    />
                </slot>
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
