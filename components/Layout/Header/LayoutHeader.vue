<script setup lang="ts">
const contextStore = useContextStore();
const { loading } = storeToRefs(contextStore);
</script>

<template>
    <header
        v-show="!loading"
        class="sticky top-0 z-30 h-fit bg-gray-light md:bg-white"
    >
        <div class="container relative z-10 py-3 md:py-6">
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-3">
                    <!-- mobile menu -->
                    <NavigationSidebar />

                    <LayoutLogo logo-classes="w-36 md:w-40" />
                </div>

                <LayoutHeaderActions />
            </div>
        </div>

        <Navigation />

        <div id="flyouts" />
    </header>
</template>
