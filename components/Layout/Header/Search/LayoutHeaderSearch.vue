<script setup lang="ts">
const searchVisible = ref(false);
const searchComponent = ref(null);
const toggleSearch = ref(null);

onClickOutside(searchComponent, event => {
    if (event.target !== toggleSearch.value) {
        searchVisible.value = false;
    }
});

// If the user is on the result page automatically open the search bar
const route = useRoute();
if (route.path === '/search') {
    searchVisible.value = true;
}
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

    <ClientOnly>
        <teleport to="#flyouts">
            <LayoutHeaderSearchBar
                v-if="searchVisible"
                ref="searchComponent"
                @close-search="searchVisible = false"
            />
        </teleport>
    </ClientOnly>
</template>
