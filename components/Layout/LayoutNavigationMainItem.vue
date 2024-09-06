<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import LayoutNavigationLink from '~/components/Layout/LayoutNavigationLink.vue';

defineProps<{
    navigationElement: Schemas["Category"]
}>()

const navigationItem = ref(null)

const { isOutside: isOutsideNavItem } = useMouseInElement(navigationItem)
const debounced = refDebounced(isOutsideNavItem, 300)
</script>

<template>
    <div
        class="min-w-max"
        ref="navigationItem"
    >
        <LayoutNavigationLink
            :navigation-element="navigationElement"
            class="text-md font-bold py-4"
            active-classes="border-b-2 border-brand-primary font-bold"
            :class="{
                'text-brand-primary': !debounced
            }"
        />
    </div>

    <LayoutNavigationFlyout
        v-if="navigationElement?.childCount > 0"
        :navigation-element="navigationElement"
        :parent-hovered="!debounced"
    />
</template>