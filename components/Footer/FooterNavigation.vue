<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    navigationElements: Schemas['Category'];
}>();
</script>

<template>
    <div class="grid gap-5 md:flex md:justify-between lg:justify-normal lg:gap-28">
        <ul
            v-for="navigationElement in navigationElements"
            :key="navigationElement.id"
            class="list-none"
        >
            <li class="mb-1 max-w-max">
                <NavigationLink
                    :navigation-element="navigationElement"
                    classes="font-bold"
                />
            </li>
            <li
                v-for="navigationChild in navigationElement.children"
                :key="navigationChild.id"
            >
                <NavigationLink
                    :navigation-element="navigationChild"
                />
            </li>
        </ul>
    </div>
</template>