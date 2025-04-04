<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { navigationMenuTriggerStyle } from '~/components/ui/navigation-menu';

defineProps<{
  navigationElements?: Schemas['Category'][];
}>();
</script>

<template>
    <slot name="header-navigation">
        <UiNavigationMenu class="!static !justify-start">
            <UiNavigationMenuList>
                <UiNavigationMenuItem v-for="navigationElement in navigationElements" :key="navigationElement.id">
                    <UiNavigationMenuLink v-if="navigationElement.visibleChildCount === 0" :class="navigationMenuTriggerStyle()">
                        <slot name="header-navigation-link">
                            <LazyLayoutHeaderNavigationLink :navigation-element="navigationElement" />
                        </slot>
                    </UiNavigationMenuLink>

                    <template v-else>
                        <slot name="header-navigation-parent">
                            <UiNavigationMenuTrigger>
                                <LazyLayoutHeaderNavigationLink
                                    :navigation-element="navigationElement"
                                    :show-as-link="navigationElement.type === 'link' || navigationElement.type === 'page'"
                                    :show-icon="false"
                                />
                            </UiNavigationMenuTrigger>
                            <UiNavigationMenuContent>
                                <ul class="max-w-11/12 grid w-96 gap-y-3 p-6 text-sm lg:grid-cols-2">
                                    <LayoutHeaderNavigationRecursiveLink :navigation-element="navigationElement" />
                                </ul>
                            </UiNavigationMenuContent>
                        </slot>
                    </template>
                </UiNavigationMenuItem>
            </UiNavigationMenuList>
        </UiNavigationMenu>
    </slot>
</template>
