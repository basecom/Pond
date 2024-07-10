<script setup lang="ts">
import { getTranslatedProperty, getCategoryRoute } from '@shopware-pwa/helpers-next';

const { navigationElements, loadNavigationElements } = useNavigation({ type: 'footer-navigation' });
const { navigationElements: serviceNavigationElements, loadNavigationElements: loadServiceElements } = useNavigation({
    type: 'service-navigation',
});

onMounted(async () => {
    await loadNavigationElements({ depth: 1 });
    await loadServiceElements({ depth: 1 });
});
</script>

<template>
    <div class="mt-auto">
        <footer class="mt-4 bg-gray-light md:mt-10">
            <div class="container py-5 md:pb-5 md:pt-10">
                <!-- footer navigation -->
                <div class="grid gap-5 md:flex md:justify-between lg:justify-normal lg:gap-28">
                    <template v-for="navigationElement in navigationElements" :key="navigationElement.id">
                        <ul class="list-none">
                            <li class="mb-1 max-w-max font-bold hover:text-brand-primary hover:underline">
                                <NuxtLink
                                    :target="
                                        navigationElement.externalLink || navigationElement.linkNewTab ? '_blank' : ''
                                    "
                                    :to="getCategoryRoute(navigationElement)"
                                >
                                    {{ getTranslatedProperty(navigationElement, 'name') }}
                                </NuxtLink>
                            </li>
                            <li v-for="navigationChild in navigationElement.children" :key="navigationChild.id">
                                <NuxtLink
                                    :target="navigationChild.externalLink || navigationChild.linkNewTab ? '_blank' : ''"
                                    :to="getCategoryRoute(navigationChild)"
                                    class="text-sm font-normal transition duration-200 hover:text-brand-primary hover:underline"
                                >
                                    {{ getTranslatedProperty(navigationChild, 'name') }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </template>
                </div>

                <!-- footer service navigation -->
                <div class="mt-4 grid gap-1 border-t-2 border-white pt-4 md:flex md:gap-6">
                    <template v-for="navigationElement in serviceNavigationElements" :key="navigationElement.id">
                        <NuxtLink
                            :target="navigationElement.externalLink || navigationElement.linkNewTab ? '_blank' : ''"
                            :to="getCategoryRoute(navigationElement)"
                            class="text-sm font-normal transition duration-200 hover:text-brand-primary hover:underline"
                        >
                            {{ getTranslatedProperty(navigationElement, 'name') }}
                        </NuxtLink>
                    </template>
                </div>
            </div>
        </footer>
    </div>
</template>
