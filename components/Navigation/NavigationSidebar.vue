<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

const { languageIdChain } = useSessionContext();
const { t } = useI18n();

const sideMenuController = useModal();

const navigationStore = useNavigationStore();
const { mainNavigation } = storeToRefs(navigationStore);

const navigationPath = ref<string[]>([]);

watch(
    languageIdChain,
    async () => {
        await navigationStore.loadNavigation('main-navigation', 2, true);
        // Reset the path when language changes
        navigationPath.value = [];
    },
    { immediate: false },
);

// Get the current category based on the last ID in the path
const currentCategory = computed<Schemas['Category'] | null>(() => {
    const lastId = navigationPath.value.at(-1);
    if (!lastId || !mainNavigation.value) return null;

    return findCategoryById(mainNavigation.value, lastId);
});

// Get the navigation items to display
const shownNavigationItems = computed(() => {
    if (navigationPath.value.length === 0) {
        return mainNavigation.value || [];
    }
    return currentCategory.value?.children || [];
});

const findCategoryById = (categories: Schemas['Category'][] | null, id: string): Schemas['Category'] | null => {
    if (!categories) return null;

    for (const category of categories) {
        if (category.id === id) return category;
        if (category.children && category.children.length > 0) {
            const found = findCategoryById(category.children, id);
            if (found) return found;
        }
    }
    return null;
};

const handleClick = (navigationElement: Schemas['Category']) => {
    if (navigationElement.childCount > 0) {
        navigationPath.value.push(navigationElement.id);
        return;
    }

    sideMenuController.close();
};

const handleBack = () => {
    navigationPath.value.pop();
};

const showBackButton = computed(() => navigationPath.value.length > 0);
</script>

<template>
    <FormKitIcon
        icon="bars"
        :title="t('icon.openSidebar')"
        class="w-4 cursor-pointer md:hidden"
        @click="sideMenuController.open()"
    />
    <LazyLayoutSidebar
        v-if="sideMenuController.isOpen"
        :controller="sideMenuController"
    >
        <template #header>
            <div
                v-if="showBackButton"
                class="flex items-center gap-2 hover:cursor-pointer hover:text-brand-primary"
                @click="handleBack()"
            >
                <FormKitIcon
                    icon="chevron-left"
                    :title="t('icon.backToPreviousCategory')"
                    class="block size-3"
                />
                <span>{{ $t('navigation.sidebar.backLinkLabel') }}</span>
            </div>
        </template>

        <template #content>
            <div class="grid gap-2 md:hidden">
                <!-- display the current category -->
                <div
                    v-if="currentCategory"
                    class="pb-1 text-lg font-bold"
                >
                    {{ getTranslatedProperty(currentCategory, 'name') }}
                </div>

                <!-- display a link to the current category with all items snippet -->
                <NavigationLink
                    v-if="currentCategory"
                    :navigation-element="currentCategory"
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
