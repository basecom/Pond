<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    navigationElement: Schemas["Category"];
    parentHovered: boolean;
}>()
const flyout = ref(null);
const { isOutside: isOutsideFlyout } = useMouseInElement(flyout)
const selfNotHovered = refDebounced(isOutsideFlyout, 300)
</script>

<template>
    <Teleport to="#flyouts">
        <div
            ref="flyout"
            v-show="parentHovered || !selfNotHovered"
            class="absolute bg-white shadow-md top-full w-full left-0 py-4"
            :data-flyout-category="navigationElement.id"
        >
            <div class="container flex">
                <div
                    v-for="child in navigationElement.children"
                    class="flex flex-col gap-2 w-1/4"
                >
                    <LayoutNavigationFlyoutItem
                        :navigation-element="child"
                        class="text-lg font-bold"
                        active-classes="text-brand-primary-dark"
                    />
                    <div class="flex flex-col gap-2">
                        <LayoutNavigationFlyoutItem
                            v-if="child.childCount > 0"
                            v-for="subChild in child.children"
                            :navigation-element="subChild"
                            active-classes="text-brand-primary-dark"
                        />
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>