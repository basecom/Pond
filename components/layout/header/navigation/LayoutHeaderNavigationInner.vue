<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware/helpers';

defineProps<{
  navigationElements?: Schemas['Category'][];
}>();
</script>

<template>
    <slot name="header-navigation">
        <!--        <div v-for="navigationElement in navigationElements" :key="navigationElement.id" class="relative">-->
        <!--            <slot name="header-navigation-name">-->
        <!--                {{ getTranslatedProperty(navigationElement, 'name') }}-->
        <!--            </slot>-->
        <!--        </div>-->

        <UiNavigationMenu>
            <UiNavigationMenuList>
                <UiNavigationMenuItem v-for="navigationElement in navigationElements" :key="navigationElement.id">
                    <UiNavigationMenuTrigger>
                      {{ getTranslatedProperty(navigationElement, 'name') }}
                    </UiNavigationMenuTrigger>
                    <UiNavigationMenuContent>
                        <ul class="grid gap-3 p-6 w-96 max-w-11/12 lg:grid-cols-2">
                            <li v-for="children in navigationElement.children" :key="children.id">
                                <UiNavigationMenuLink as-child>
                                    {{ getTranslatedProperty(children, 'name') }}
                                </UiNavigationMenuLink>
                            </li>
                        </ul>
                    </UiNavigationMenuContent>
                </UiNavigationMenuItem>
            </UiNavigationMenuList>
        </UiNavigationMenu>
    </slot>
</template>
