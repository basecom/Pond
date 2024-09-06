<script setup lang="ts">
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const { loadNavigationElements, navigationElements } = useNavigation();
await loadNavigationElements({ depth: 2 });
const sideMenuController = useModal();

const shownNavigationItems = ref();
shownNavigationItems.value = navigationElements.value;
const previousNavigationItems = ref([])

const handleClick = (navigationElement) => {
    previousNavigationItems.value.push(navigationElement);
    shownNavigationItems.value = navigationElement.children
}

const handleBack = () => {

}
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
        <div class="grid gap-2 md:hidden">
            <div @click="handleBack">
                <FormKitIcon icon="chevron-left" class="block h-3 w-3" />
                back
            </div>
            <template
                v-for="navigationElement in shownNavigationItems"
                :key="navigationElement.id"
            >
                <LayoutNavigationLink
                    v-if="navigationElement.childCount <= 0"
                    :navigation-element="navigationElement"
                    class="border-b-2 border-gray-light"
                    active-classes="font-bold md:border-b-2 md:border-brand-primary"
                />
                <div
                    v-else
                    class="border-b-2 border-gray-light flex hover:cursor-pointer hover:text-brand-primary"
                    @click="handleClick(navigationElement, shownNavigationItems)"
                >
                    {{ getTranslatedProperty(navigationElement, 'name') }}

                    <FormKitIcon icon="chevron-right" class="block h-3 w-3" />
                </div>
<!--                <NuxtLink-->
<!--                    :target="-->
<!--                        navigationElement.externalLink || navigationElement.linkNewTab ? '_blank' : ''-->
<!--                    "-->
<!--                    :rel="-->
<!--                        navigationElement.externalLink || navigationElement.linkNewTab-->
<!--                            ? 'noopener noreferrer nofollow'-->
<!--                            : ''-->
<!--                    "-->
<!--                    :aria-label="getTranslatedProperty(navigationElement, 'name')"-->
<!--                    :to="getCategoryRoute(navigationElement)"-->
<!--                    class="border-b-2 border-gray-light py-3 md:min-w-max md:border-0 md:pb-2"-->
<!--                >-->
<!--&lt;!&ndash;                                    :class="{&ndash;&gt;-->
<!--&lt;!&ndash;                                        'font-bold md:border-b-2 md:border-brand-primary':&ndash;&gt;-->
<!--&lt;!&ndash;                                            getTranslatedProperty(navigationElement, 'name') == 'Gift cards' ||&ndash;&gt;-->
<!--&lt;!&ndash;                                            isActive(navigationElement.seoUrls),&ndash;&gt;-->
<!--&lt;!&ndash;                                    }"&ndash;&gt;-->
<!--                    {{ getTranslatedProperty(navigationElement, 'name') }}-->
<!--                </NuxtLink>-->
            </template>
        </div>
    </LazyLayoutSidebar>
</template>