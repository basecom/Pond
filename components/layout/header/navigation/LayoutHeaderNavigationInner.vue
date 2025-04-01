<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware/helpers';
import {navigationMenuTriggerStyle} from '~/components/ui/navigation-menu';

defineProps<{
  navigationElements?: Schemas['Category'][];
}>();
</script>

<template>
    <slot name="header-navigation">
        <!--                <div v-for="navigationElement in navigationElements" :key="navigationElement.id" class="relative">-->
        <!--                    <slot name="header-navigation-name">-->
        <!--                        {{ getTranslatedProperty(navigationElement, 'name') }}-->
        <!--                    </slot>-->
        <!--                </div>-->
        <UiNavigationMenu>
            <UiNavigationMenuList>
                <UiNavigationMenuItem v-for="navigationElement in navigationElements" :key="navigationElement.id">
                    <UiNavigationMenuLink v-if="navigationElement.childCount === 0" :class="navigationMenuTriggerStyle()">
                        <LazyLayoutHeaderNavigationLink :navigation-element="navigationElement" />
                    </UiNavigationMenuLink>

                    <template v-else>
                        <UiNavigationMenuTrigger>
                            {{ getTranslatedProperty(navigationElement, 'name') }}
                        </UiNavigationMenuTrigger>
                        <UiNavigationMenuContent>
                            <ul class="max-w-11/12 grid w-96 gap-y-3 p-6 text-sm lg:grid-cols-2">
                                <li v-for="children in navigationElement.children" :key="children.id">
                                    <UiNavigationMenuLink :class="navigationMenuTriggerStyle()">
                                        <LazyLayoutHeaderNavigationLink :navigation-element="children"/>
                                    </UiNavigationMenuLink>
                                </li>
                            </ul>
                        </UiNavigationMenuContent>
                    </template>
                </UiNavigationMenuItem>
            </UiNavigationMenuList>
        </UiNavigationMenu>
    </slot>
</template>
