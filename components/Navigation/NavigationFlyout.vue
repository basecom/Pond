<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    navigationElement: Schemas['Category'];
    parentHovered: boolean;
}>();

const flyout = ref(null);
const { isOutside: isOutsideFlyout } = useMouseInElement(flyout);
const selfNotHovered = refDebounced(isOutsideFlyout, 200);
</script>

<template>
    <Teleport to="#flyouts">
        <div
            v-show="parentHovered || !selfNotHovered"
            ref="flyout"
            class="absolute left-0 top-full w-full bg-white py-4 shadow-md"
            :data-flyout-category="navigationElement.id"
        >
            <div class="container flex">
                <div
                    v-for="child in navigationElement.children"
                    :key="`nav-item-${child.id}`"
                    class="flex w-1/4 flex-col gap-2"
                >
                    <NavigationLink
                        :navigation-element="child"
                        classes="text-lg font-bold py-2"
                        active-classes="text-brand-primary"
                    />
                    <div class="flex flex-col gap-2">
                        <template v-if="child.childCount > 0">
                            <NavigationLink
                                v-for="subChild in child.children"
                                :key="`nav-item-${subChild.id}`"
                                :navigation-element="subChild"
                                classes="py-2"
                                active-classes="text-brand-primary"
                            />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>
