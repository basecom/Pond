<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware/helpers';

defineProps<{
  navigationElements?: Schemas['Category'][];
  lastPreviousItem?: Schemas['Category'];
  open: boolean;
}>();

defineEmits<{
  click: [navigationElement?: Schemas['Category'], categoryLink?: string, options?: {open: {target: string}}];
  back: [];
  open: [value: boolean];
}>();
</script>

<template>
    <div class="flex items-center md:hidden">
        <UiSheet :open="open" @update:open="(value: boolean) => $emit('open', value)">
            <slot name="mobile-menu-trigger">
                <UiSheetTrigger class="size-5">
                    <slot name="mobile-menu-icon">
                        <Icon name="mdi:menu" class="size-5" />
                    </slot>
                </UiSheetTrigger>
            </slot>

            <LazyUiSheetContent side="left">
                <LazyUiSheetHeader class="!text-left">
                    <LazyUiSheetTitle>
                        <slot name="mobile-menu-title">
                            <template v-if="lastPreviousItem">
                                {{ getTranslatedProperty(lastPreviousItem, 'name') }}
                            </template>

                            <template v-else>
                                {{ $t('general.categories') }}
                            </template>
                        </slot>
                    </LazyUiSheetTitle>

                    <LazyUiSheetDescription class="text-initial text-base">
                        <slot name="mobile-menu-description">
                            <div v-auto-animate class="grid gap-2">
                                <!-- display a back link -->
                                <slot name="mobile-menu-back">
                                    <div v-if="lastPreviousItem" class="flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3" @click="$emit('back')">
                                        <Icon name="mdi:chevron-left" class="size-5" />
                                        {{ $t('general.back') }}
                                    </div>
                                </slot>

                                <!-- display a link to the current category with all items snippet (if its not a folder) -->
                                <slot name="mobile-menu-current">
                                    <LazyLayoutHeaderNavigationLink
                                        v-if="lastPreviousItem && (lastPreviousItem.type === 'link' || lastPreviousItem.type === 'page')"
                                        :navigation-element="lastPreviousItem"
                                        :alternative-name="$t('general.showAll')"
                                        :classes="{ 'border-b-2 border-gray-100 py-3': true }"
                                        @click="(navigationElement, categoryLink, options) => $emit('click', lastPreviousItem, categoryLink, options)"
                                    />
                                </slot>

                                <!-- display the currently visible categories -->
                                <slot name="mobile-menu-categories">
                                    <LazyLayoutHeaderNavigationLink
                                        v-for="navigationElement in navigationElements"
                                        :key="navigationElement.id"
                                        class="border-b-2 border-gray-100 py-3"
                                        :navigation-element="navigationElement"
                                        :show-as-link="navigationElement.visibleChildCount === 0"
                                        @click="(navigationElement, categoryLink, options) => $emit('click', navigationElement, categoryLink, options)"
                                    />
                                </slot>
                            </div>
                        </slot>
                    </LazyUiSheetDescription>
                </LazyUiSheetHeader>
            </LazyUiSheetContent>
        </UiSheet>
    </div>
</template>
