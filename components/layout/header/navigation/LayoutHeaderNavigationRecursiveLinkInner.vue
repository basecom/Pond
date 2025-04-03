<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { navigationMenuTriggerStyle } from '~/components/ui/navigation-menu';

withDefaults(
    defineProps<{
      navigationElement: Schemas['Category'];
      classes?: { [key: string]: boolean };
    }>(),
    {
        classes: undefined,
    },
);
</script>

<template>
    <li v-for="children in navigationElement.children" :key="children.id" :class="classes">
        <slot>
            <UiNavigationMenuLink :class="navigationMenuTriggerStyle()">
                <LazyLayoutHeaderNavigationLink :navigation-element="children" />
            </UiNavigationMenuLink>

            <LayoutHeaderNavigationRecursiveLink
                :navigation-element="children"
                :classes="{
                    'pl-2': true
                }"
            />
        </slot>
    </li>
</template>
