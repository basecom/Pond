<script setup lang="ts">
import { cn } from '@/lib/utils';
import {
    NavigationMenuRoot,
    type NavigationMenuRootEmits,
    type NavigationMenuRootProps,
    useForwardPropsEmits,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<NavigationMenuRootProps & { class?: HTMLAttributes['class'] }>();

const emits = defineEmits<NavigationMenuRootEmits>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <NavigationMenuRoot
        v-bind="forwarded"
        :class="cn('relative z-10 flex w-full flex-1 items-center justify-center', props.class)"
    >
        <slot />
        <UiNavigationMenuViewport />
    </NavigationMenuRoot>
</template>
