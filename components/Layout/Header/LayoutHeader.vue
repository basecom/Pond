<script setup lang="ts">
import LayoutNavigationSidebar from '~/components/Layout/LayoutNavigationSidebar.vue';

const customerStore = useCustomerStore();
const { loading } = storeToRefs(customerStore);
</script>

<template>
    <header
        v-show="!loading"
        class="sticky top-0 z-10 h-fit bg-gray-light md:bg-white"
    >
        <div class="container relative z-10 py-3 md:py-6">
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-3">
                    <!-- mobile menu -->
                    <LayoutNavigationSidebar />

                    <LayoutLogo logo-classes="w-36 md:w-40" />
                </div>

                <LayoutHeaderActions />
            </div>
        </div>

        <LayoutNavigation />

        <div id="flyouts" />
    </header>
</template>
