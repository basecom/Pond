<script setup lang="ts">
/**
 * example usage:
 * <SharedPopover default-value="item-1">
 *     <template #trigger>account</template>
 *     <template #content><ul> ... </ul></template>
 * </SharedAccordionRoot>
 */
withDefaults(
    defineProps<{
        withCloseButton?: boolean;
    }>(),
    {
        withCloseButton: true,
    },
);
</script>

<template>
    <PopoverRoot>
        <PopoverTrigger
            class="none inline-flex items-center justify-center"
            :aria-label="$t('shared.popover.triggerAriaLabel')"
        >
            <slot name="trigger"></slot>
        </PopoverTrigger>

        <PopoverContent
            side="bottom"
            :side-offset="5"
            class="w-64 rounded border border-gray-light bg-white p-4 shadow-md"
        >
            <slot name="content"></slot>

            <PopoverClose
                v-if="withCloseButton"
                class="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full"
                :aria-label="$t('shared.popover.closeButtonAriaLabel')"
            >
                <FormKitIcon
                    class="block h-5 w-5 text-gray"
                    icon="xmark"
                />
            </PopoverClose>

            <PopoverArrow class="fill-white" />
        </PopoverContent>
    </PopoverRoot>
</template>
