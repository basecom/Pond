<script setup lang="ts">
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const { loadNavigationElements, navigationElements } = useNavigation();
await loadNavigationElements({ depth: 2 });

</script>

<template>
    <NavigationMenuRoot
        class="relative z-[1] flex w-full justify-start"
    >
        <NavigationMenuList class="flex gap-4">
            <NavigationMenuItem
                v-for="navigationElement in navigationElements"
                :key="`nav-item-${navigationElement.id}`"
                class="p-4 first:pl-0 last:pr-0"
            >
                <NavigationMenuTrigger>
                    <NuxtLink
                        :target="
                            navigationElement.externalLink || navigationElement.linkNewTab ? '_blank' : ''
                        "
                        :rel="
                            navigationElement.externalLink || navigationElement.linkNewTab
                                ? 'noopener noreferrer nofollow'
                                : ''
                        "
                        :aria-label="getTranslatedProperty(navigationElement, 'name')"
                        :to="getCategoryRoute(navigationElement)"
                    >
                        {{ getTranslatedProperty(navigationElement, 'name') }}
                    </NuxtLink>
                </NavigationMenuTrigger>

                <NavigationMenuContent class="bg-white">
                    <div class="w-1/3 flex flex-col gap-4 p-4">
                        <NuxtLink
                            v-for="child in navigationElement.children"
                            :key="`nav-item-${child.id}`"
                            :target="
                            child.externalLink || child.linkNewTab ? '_blank' : ''
                        "
                            :rel="
                            child.externalLink || child.linkNewTab
                                ? 'noopener noreferrer nofollow'
                                : ''
                        "
                            :aria-label="getTranslatedProperty(child, 'name')"
                            :to="getCategoryRoute(child)"
                            class="w-full flex flex-row justify-between hover:text-brand-primary items-center"
                        >
                            {{ getTranslatedProperty(child, 'name') }}

                            <FormKitIcon icon="chevron-right" class="h-3 w-3 block" />
                        </NuxtLink>
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>

        <div class="absolute top-full left-0 flex w-full shadow-md">
            <NavigationMenuViewport
                class="relative w-full overflow-hidden"
            />
        </div>
    </NavigationMenuRoot>
</template>

<style scoped>

</style>