<script setup lang="ts">
const { languageIdChain } = useSessionContext();
const navigationStore = useNavigationStore();
const { mainNavigationElements } = storeToRefs(navigationStore);
watch(
    languageIdChain,
    async () => {
        await navigationStore.loadMainNavigation(2, true);
    },
    { immediate: false },
);
</script>

<template>
    <div class="relative hidden w-screen md:block md:bg-gray-light">
        <div class="container flex gap-4 overflow-x-auto">
            <NavigationMainItem
                v-for="navigationElement in mainNavigationElements"
                :key="`nav-item-${navigationElement.id}`"
                :navigation-element="navigationElement"
            />
        </div>
    </div>
</template>
