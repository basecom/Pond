<script setup lang="ts">
const searchVisible = ref(false);
const searchComponent = ref(null);
const toggleSearch = ref(null);

onClickOutside(searchComponent, event => {
    if (event.target !== toggleSearch.value) {
        searchVisible.value = false;
    }
});
</script>

<template>
    <button
        ref="toggleSearch"
        @click="searchVisible = !searchVisible"
    >
        <FormKitIcon
            class="pointer-events-none block h-6 w-6"
            icon="search"
        />
    </button>

    <teleport to="header">
        <LayoutHeaderSearchBar
            v-if="searchVisible"
            ref="searchComponent"
            @close-search="searchVisible = false"
        />
    </teleport>
</template>
