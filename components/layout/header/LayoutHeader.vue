<script setup lang="ts">
const { loadNavigationElements, navigationElements } = useNavigation();
await loadNavigationElements({ depth: 2 });
</script>

<template>
    <LayoutHeaderInner :navigation-elements="navigationElements" />
</template>
