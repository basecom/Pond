<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
  navigationElements?: Schemas['Category'][];
}>();

// shownNavigationItems stores the nav items that should be shown at the moment, navigationElements initially
// will be updated with the child categories when a category with children is selected
const shownNavigationItems = ref(props.navigationElements);
console.log(shownNavigationItems.value)

// previousNavigationItems stores the nav items that got selected and who's children get displayed
// used to navigate back and display the link above the children
const previousNavigationItems: Ref<Schemas['Category'][]> = ref([]);
const isOpen = ref(false);

const handleClick = async (navigationElement?: Schemas['Category'], categoryLink?: string, options?: {open: {target: string}}) => {
    if (!navigationElement) {
        return;
    }

    if (navigationElement.visibleChildCount ? navigationElement.visibleChildCount > 0 : navigationElement.childCount > 0) {
        previousNavigationItems.value.push(navigationElement);
        shownNavigationItems.value = navigationElement.children;
        return;
    }

    isOpen.value = false;
    shownNavigationItems.value = props.navigationElements;
    previousNavigationItems.value = [];
    await navigateTo(categoryLink, options);
};

const handleBack = () => {
    if (previousNavigationItems.value.length <= 1) {
        shownNavigationItems.value = props.navigationElements;
        previousNavigationItems.value.pop();
        return;
    }

    previousNavigationItems.value.pop();
    shownNavigationItems.value = previousNavigationItems.value.at(-1)?.children;
};

const lastPreviousItem = computed(() => previousNavigationItems.value.length > 0 && previousNavigationItems.value.at(-1) ? previousNavigationItems.value.at(-1) : undefined);
</script>

<template>
    <LayoutHeaderNavigationMobileInner
        :navigation-elements="shownNavigationItems?.length === 0 ? navigationElements : shownNavigationItems"
        :last-previous-item="lastPreviousItem"
        :open="isOpen"
        @click="(navigationElement, categoryLink) => handleClick(navigationElement, categoryLink)"
        @back="handleBack"
        @open="(value: boolean) => isOpen = value"
    />
</template>
