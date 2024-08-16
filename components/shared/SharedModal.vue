<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        controller: ReturnType<typeof useModal>;
        withCloseButton?: boolean;
        withActions?: boolean;
        submitAction?: () => void;
        size?: 'sm' | 'md' | 'lg';
    }>(),
    {
        withCloseButton: false,
        withActions: false,
        submitAction: () => {},
        size: 'md',
    },
);

const { controller } = toRefs(props);
const { isOpen, close } = controller.value;

const { escape } = useMagicKeys();

watch(escape, () => {
    isOpen.value && close();
});

const modalContentElement = ref();
onClickOutside(modalContentElement, () => close());
</script>

<template>
    <Teleport to="#teleports">
        <Transition
            enter-active-class="transition ease-out duration-200 transform"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in duration-200 transform"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-show="isOpen"
                class="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50"
            >
                <div class="flex items-center justify-center px-4 pt-12">
                    <Transition
                        enter-active-class="transition ease-out duration-1000 transform "
                        enter-from-class="-translate-y-10 scale-50"
                        enter-to-class="translate-y-0 scale-100"
                        leave-active-class="ease-in duration-1000"
                        leave-from-class=" translate-y-0 scale-100"
                        leave-to-class=" -translate-y-10 scale-50"
                    >
                        <div
                            v-if="isOpen"
                            id="modal-content"
                            ref="modalContentElement"
                            class="min-w-96 overflow-hidden rounded-lg bg-white text-left shadow-xl"
                            :class="{
                                'w-80': size === 'sm',
                                'w-128': size === 'md',
                                'w-2/3': size === 'lg',
                            }"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div class="flex justify-between gap-4 border-b border-gray-light px-8 pb-4 pt-8">
                                <slot name="title">demo title</slot>
                                <FormKitIcon
                                    v-if="withCloseButton"
                                    icon="x"
                                    class="block h-4 w-4 text-gray hover:cursor-pointer"
                                    @click="controller.close()"
                                />
                            </div>
                            <div
                                class="px-8 py-4"
                                :class="{
                                    'pb-8': !withActions,
                                }"
                            >
                                <slot name="content">Lorem ipsum dolor sit amet</slot>
                            </div>
                            <div
                                v-if="withActions"
                                class="flex gap-4 border-t border-gray-light px-8 pb-8 pt-4"
                            >
                                <slot name="actions">
                                    <FormKit
                                        type="button"
                                        label="cancel"
                                        :classes="{
                                            outer: 'w-full',
                                        }"
                                        @click="controller.close()"
                                    />
                                    <FormKit
                                        type="submit"
                                        label="submit"
                                        :classes="{
                                            outer: 'w-full',
                                        }"
                                        @click="submitAction()"
                                    />
                                </slot>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
