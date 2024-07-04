<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        controller: ReturnType<typeof useModal>;
        isClosable?: boolean;
        side: 'left' | 'right';
        additionalClasses?: string;
    }>(),
    {
        side: 'left',
        isClosable: true,
        additionalClasses: '',
    },
);

const { controller } = toRefs(props);
const { isOpen, close } = controller.value;

const sidebarContentElement = ref();
onClickOutside(sidebarContentElement, () => (props.isClosable ? close() : ''));

const toggleOverlay = (newIsOpen: boolean) => {
    newIsOpen
        ? document.body?.classList.add('overflow-y-hidden')
        : document.body?.classList.remove('overflow-y-hidden');
};

watch(isOpen, newIsOpen => {
    toggleOverlay(newIsOpen);
});
</script>

<template>
    <Teleport to="body">
        <div
            ref="sidebarContentElement"
            class="fixed top-0 z-40 h-screen w-10/12 overflow-y-auto bg-white p-4 transition-transform duration-500 sm:w-96"
            tabindex="-1"
            aria-labelledby="sidebar"
            :class="{
                '!translate-x-0': isOpen,
                'left-0 -translate-x-full': side === 'left',
                'right-0 translate-x-full': side === 'right',
            }"
        >
            <UtilityIcon icon="xmark" class="mb-4 ml-auto w-4 cursor-pointer" @click="controller.close()" />
            <slot></slot>
        </div>

        <!-- body overlay -->
        <div v-if="isOpen" class="fixed inset-0 z-30 h-screen w-screen bg-black/50" />
    </Teleport>
</template>
