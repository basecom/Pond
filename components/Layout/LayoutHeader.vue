<script setup lang="ts">
import LayoutSearch from '~/components/Layout/LayoutSearch.vue';
import UtilityIcon from '~/components/Utility/UtilityIcon.vue';
import LayoutNavigationItems from '~/components/Layout/Navigation/LayoutNavigationItems.vue';

const customerStore = useCustomerStore();
const { loadNavigationElements, navigationElements } = useNavigation();
const { loading } = storeToRefs(customerStore);
const sideMenuController = useSideMenuModal();

customerStore.refreshContext();
await loadNavigationElements({ depth: 2 });
</script>

<template>
    <header v-show="!loading" class="sticky border-b-2 border-neutral-ash bg-white">
        <div class="container py-3 md:pb-0 md:pt-4">
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-3">
                    <!-- mobile menu -->
                    <UtilityIcon class="w-4 cursor-pointer md:hidden" icon="bars" @click="sideMenuController.open()" />
                    <LazyLayoutSidebar v-if="sideMenuController.isOpen" :controller="sideMenuController">
                        <div class="grid gap-2 md:hidden">
                            <LayoutNavigationItems :navigation-elements="navigationElements" />
                        </div>
                    </LazyLayoutSidebar>

                    <!-- search -->
                    <LayoutSearch />
                </div>

                <LayoutLogo logo-classes="w-36 md:w-40" />
                <div>hhuuh</div>
            </div>

            <div class="mt-4 hidden items-center gap-6 md:flex md:overflow-x-auto">
                <LayoutNavigationItems :navigation-elements="navigationElements" />
            </div>
        </div>
    </header>
</template>
