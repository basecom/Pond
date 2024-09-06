<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        controller: ReturnType<typeof useModal>;
        isClosable?: boolean;
        side?: 'left' | 'right';
    }>(),
    {
        side: 'left',
        isClosable: true,
    },
);

const { controller } = toRefs(props);
const { isOpen, close } = controller.value;

const sidebarContentElement = ref();
onClickOutside(sidebarContentElement, () => (props.isClosable ? close() : ''));
</script>

<template>
    <Teleport to="body">
        <div
            ref="sidebarContentElement"
            class="fixed top-0 z-40 h-screen w-10/12 overflow-y-auto bg-white transition-transform duration-500 sm:w-96"
            tabindex="-1"
            aria-labelledby="sidebar"
            :class="{
                '!translate-x-0': isOpen,
                'left-0 -translate-x-full': side === 'left',
                'right-0 translate-x-full': side === 'right',
            }"
        >
            <div class="bg-gray-light p-4 flex justify-between">
                <slot name="header"></slot>
                <FormKitIcon
                    icon="xmark"
                    class="mb-4 ml-auto block h-4 w-4 cursor-pointer"
                    @click="controller.close()"
                />
            </div>
            <div class="p-4">
                <slot name="content"></slot>
            </div>
        </div>

        <!-- body overlay -->
        <div
            v-if="isOpen"
            class="fixed inset-0 z-30 h-screen w-screen bg-black/50"
        />
    </Teleport>
</template>
