<script setup lang="ts">
const { loadNavigationElements, navigationElements } = useNavigation();
await loadNavigationElements({ depth: 2 });
</script>

<template>
    <div class="relative hidden w-screen md:block md:bg-gray-light">
        <div class="container flex gap-8 overflow-x-scroll py-4">
            <LayoutNavigationMainItem
                v-for="navigationElement in navigationElements"
                :key="navigationElement.id"
                :navigation-element="navigationElement"
            />
        </div>
    </div>
</template>