<script setup lang="ts">
import { cn } from '@/lib/utils';
import { DialogClose, DialogTitle, type DialogTitleProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import { X } from 'lucide-vue-next';

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
    <DialogTitle
        :class="cn('text-lg font-semibold text-gray-950 flex items-center justify-between', props.class)"
        v-bind="delegatedProps"
    >
        <slot />

        <DialogClose
            class="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100"
        >
            <X class="size-4" />
        </DialogClose>
    </DialogTitle>
</template>
