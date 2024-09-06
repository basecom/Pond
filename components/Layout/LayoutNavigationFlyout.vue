<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import LayoutNavigationLink from '~/components/Layout/LayoutNavigationLink.vue';

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
                    <LayoutNavigationLink
                        :navigation-element="child"
                        classes="text-lg font-bold"
                        active-classes="text-brand-primary"
                    />
                    <div class="flex flex-col gap-2">
                        <template v-if="child.childCount > 0">
                            <LayoutNavigationLink
                                v-for="subChild in child.children"
                                :key="`nav-item-${subChild.id}`"
                                :navigation-element="subChild"
                                active-classes="text-brand-primary"
                            />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>
