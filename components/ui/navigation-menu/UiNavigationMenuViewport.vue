<script setup lang="ts">
import { cn } from '@/lib/utils';
import {
    NavigationMenuViewport,
    type NavigationMenuViewportProps,
    useForwardProps,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<NavigationMenuViewportProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <!-- custom change: add left-[--reka-navigation-menu-viewport-left] as first class parameter -->
    <!-- https://github.com/ZTL-UwU/shadcn-docs-nuxt/issues/23 -->
    <!-- https://github.com/ZTL-UwU/shadcn-docs-nuxt/commit/bd8d9ac51172e4cd9d56c0dfef293c282a3dc2dc -->
    <div class="absolute left-auto top-full flex justify-center">
        <NavigationMenuViewport
            v-bind="forwardedProps"
            :class="
                cn(
                    'left-[--reka-navigation-menu-viewport-left]',
                    'origin-top-center relative mt-1.5 h-[--reka-navigation-menu-viewport-height] w-full overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[--reka-navigation-menu-viewport-width]',
                    props.class,
                )
            "
        />
    </div>
</template>
