<script setup lang="ts">
import { getTranslatedProperty, getCategoryRoute } from '@shopware-pwa/helpers-next';

const navigationStore = useNavigationStore();
const { footerNavigation, serviceNavigation } = storeToRefs(navigationStore);

onMounted(async () => {
    await navigationStore.loadNavigation('footer-navigation', 1);
    await navigationStore.loadNavigation('service-navigation', 1);
});
</script>

<template>
    <div class="mt-auto">
        <footer class="mt-4 bg-gray-light md:mt-10">
            <div class="container py-5 md:pb-5 md:pt-10">
                <!-- footer navigation -->
                <div class="grid gap-5 md:flex md:justify-between lg:justify-normal lg:gap-28">
                    <template
                        v-for="navigationElement in footerNavigation"
                        :key="navigationElement.id"
                    >
                        <ul class="list-none">
                            <li
                                v-if="navigationElement.type === 'folder'"
                                class="mb-1 max-w-max font-bold"
                            >
                                {{ getTranslatedProperty(navigationElement, 'name') }}
                            </li>
                            <li
                                v-else
                                class="mb-1 max-w-max font-bold hover:text-brand-primary hover:underline"
                            >
                                <LocaleLink
                                    :target="
                                        navigationElement.externalLink || navigationElement.linkNewTab ? '_blank' : ''
                                    "
                                    :to="getCategoryRoute(navigationElement)"
                                >
                                    {{ getTranslatedProperty(navigationElement, 'name') }}
                                </LocaleLink>
                            </li>
                            <li
                                v-for="navigationChild in navigationElement.children"
                                :key="navigationChild.id"
                            >
                                <LocaleLink
                                    :target="navigationChild.externalLink || navigationChild.linkNewTab ? '_blank' : ''"
                                    :to="getCategoryRoute(navigationChild)"
                                    class="text-sm font-normal transition duration-200 hover:text-brand-primary hover:underline"
                                >
                                    {{ getTranslatedProperty(navigationChild, 'name') }}
                                </LocaleLink>
                            </li>
                        </ul>
                    </template>
                </div>

                <LayoutFooterActions />
                <LayoutFooterPaymentMethods />

                <!-- footer service navigation -->
                <div class="mt-4 grid gap-1 border-t-2 border-white pt-4 md:flex md:gap-6">
                    <template
                        v-for="navigationElement in serviceNavigation"
                        :key="navigationElement.id"
                    >
                        <LocaleLink
                            :target="navigationElement.externalLink || navigationElement.linkNewTab ? '_blank' : ''"
                            :to="getCategoryRoute(navigationElement)"
                            class="text-sm font-normal transition duration-200 hover:text-brand-primary hover:underline"
                        >
                            {{ getTranslatedProperty(navigationElement, 'name') }}
                        </LocaleLink>
                    </template>
                </div>
            </div>
        </footer>
    </div>
</template>
