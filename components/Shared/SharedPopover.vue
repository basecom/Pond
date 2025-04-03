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

const { t } = useI18n();
</script>

<template>
    <PopoverRoot>
        <PopoverTrigger
            class="none inline-flex items-center justify-center"
            :aria-label="$t('shared.popover.triggerAriaLabel')"
        >
            <slot name="trigger" />
        </PopoverTrigger>

        <PopoverContent
            side="bottom"
            :side-offset="5"
            class="w-64 rounded border border-gray-light bg-white p-4 shadow-md"
        >
            <slot name="content" />

            <PopoverClose
                v-if="withCloseButton"
                class="absolute right-1 top-1 inline-flex size-6 items-center justify-center rounded-full"
                :aria-label="$t('shared.popover.closeButtonAriaLabel')"
            >
                <FormKitIcon
                    class="block size-5 text-gray"
                    icon="xmark"
                    :title="t('icon.close')"
                />
            </PopoverClose>

            <PopoverArrow class="fill-white" />
        </PopoverContent>
    </PopoverRoot>
</template>
