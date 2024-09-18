<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    navigationElement: Schemas['Category'];
}>();

const navigationItem = ref(null);

const { isOutside: isOutsideNavItem } = useMouseInElement(navigationItem);
const debounced = refDebounced(isOutsideNavItem, 300);
</script>

<template>
    <div
        ref="navigationItem"
        class="min-w-max px-2 py-4"
    >
        <NavigationLink
            :navigation-element="navigationElement"
            class="text-md font-bold"
            active-classes="border-b-2 border-brand-primary font-bold"
            :class="{
                'text-brand-primary': !debounced,
            }"
            :as-link="navigationElement.type !== 'folder'"
        />
    </div>

    <NavigationFlyout
        v-if="navigationElement?.childCount > 0"
        :navigation-element="navigationElement"
        :parent-hovered="!debounced"
    />
</template>
