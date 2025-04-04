<script setup lang="ts">
const { sessionContext } = useSessionContext();
const { loadNavigationElements, navigationElements } = useNavigation();

// we load per maximum four levels
const navigationCategoryDepth = sessionContext.value?.salesChannel.navigationCategoryDepth <= 4 ? sessionContext.value?.salesChannel.navigationCategoryDepth : 4;

onMounted(async () => {
    await loadNavigationElements({ depth: navigationCategoryDepth });
});
</script>

<template>
    <LayoutHeaderInner :navigation-elements="navigationElements" />
</template>
