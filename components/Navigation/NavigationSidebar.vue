<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

const { languageIdChain } = useSessionContext();
const navigationStore = useNavigationStore();
const { mainNavigationElements } = storeToRefs(navigationStore);

const sideMenuController = useModal();

// shownNavigationItems stores the nav items that should be shown at the moment, navigationElements initially
// will be updated with the child categories when a category with children is selected
const shownNavigationItems = ref(mainNavigationElements.value);

// previousNavigationItems stores the nav items that got selected and who's children get displayed
// used to navigate back and display the link above the children
const previousNavigationItems = ref<Schemas['Category'][]>([]);

watch(
    languageIdChain,
    async () => {
        await navigationStore.loadMainNavigation(2, true);
        shownNavigationItems.value = mainNavigationElements.value;
        previousNavigationItems.value = [];
    },
    { immediate: false },
);

const handleClick = (navigationElement: Schemas['Category']) => {
    if (navigationElement.childCount > 0) {
        previousNavigationItems.value.push(navigationElement);
        shownNavigationItems.value = navigationElement.children;
        return;
    }

    sideMenuController.close();
};

const handleBack = () => {
    if (previousNavigationItems.value.length <= 1) {
        shownNavigationItems.value = mainNavigationElements.value;
        previousNavigationItems.value.pop();
        return;
    }
    previousNavigationItems.value.pop();
    shownNavigationItems.value = previousNavigationItems.value.at(-1)?.children;
};

const lastPreviousItem = computed(() =>
    previousNavigationItems.value.length > 0 && previousNavigationItems.value.at(-1)
        ? previousNavigationItems.value.at(-1)
        : null,
);
</script>

<template>
    <FormKitIcon
        icon="bars"
        class="w-4 cursor-pointer md:hidden"
        @click="sideMenuController.open()"
    />
    <LazyLayoutSidebar
        v-if="sideMenuController.isOpen"
        :controller="sideMenuController"
    >
        <template #header>
            <div
                v-if="previousNavigationItems.length > 0"
                class="flex items-center gap-2 hover:cursor-pointer hover:text-brand-primary"
                @click="handleBack()"
            >
                <FormKitIcon
                    icon="chevron-left"
                    class="block size-3"
                />
                <span>{{ $t('navigation.sidebar.backLinkLabel') }}</span>
            </div>
        </template>

        <template #content>
            <div class="grid gap-2 md:hidden">
                <!-- display the current category -->
                <div
                    v-if="lastPreviousItem"
                    class="pb-1 text-lg font-bold"
                >
                    {{ getTranslatedProperty(lastPreviousItem, 'name') }}
                </div>

                <!-- display a link to the current category with all items snippet -->
                <NavigationLink
                    v-if="lastPreviousItem"
                    :navigation-element="lastPreviousItem"
                    classes="border-b-2 border-gray-light py-2"
                    :as-all-items-link="true"
                />

                <!-- display the child categories -->
                <NavigationLink
                    v-for="navigationElement in shownNavigationItems"
                    :key="navigationElement.id"
                    :navigation-element="navigationElement"
                    classes="border-b-2 border-gray-light py-2"
                    active-classes="font-bold md:border-b-2 md:border-brand-primary"
                    :as-link="navigationElement.childCount === 0"
                    :display-icon="navigationElement.childCount > 0"
                    @click="handleClick(navigationElement)"
                />
            </div>
        </template>
    </LazyLayoutSidebar>
</template>
