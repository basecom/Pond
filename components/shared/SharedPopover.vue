<script setup lang="ts">
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
            class="none inline-flex h-8 w-8 items-center justify-center"
            aria-label="account dropdown"
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
                aria-label="Close"
            >
                <FormKitIcon
                    class="block h-5 w-5 text-gray"
                    icon="x"
                />
            </PopoverClose>
            <PopoverArrow class="fill-white" />
        </PopoverContent>
    </PopoverRoot>
</template>
