<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware/helpers';

defineProps<{
  navigationElements?: Schemas['Category'][];
  lastPreviousItem?: Schemas['Category'];
  open: boolean;
}>();

defineEmits<{
  click: [navigationElement: Schemas['Category'], categoryLink: string|null, options?: {target: string}];
  back: [];
  open: [value: boolean];
}>();
</script>

<template>
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
                    <template v-if="lastPreviousItem">
                        {{ getTranslatedProperty(lastPreviousItem, 'name') }}
                    </template>

                    <template v-else>
                        Kategorien
                    </template>
                </LazyUiSheetTitle>

                <LazyUiSheetDescription class="text-initial text-base">
                    <div v-auto-animate class="grid gap-2">
                        <!-- display a back link -->
                        <div v-if="lastPreviousItem" class="flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3" @click="$emit('back')">
                            <Icon name="mdi:chevron-left" class="size-5" />
                            Zurück
                        </div>

                        <!-- display a link to the current category with all items snippet (if its not a folder) -->
                        <LazyLayoutHeaderNavigationLink
                            v-if="lastPreviousItem && lastPreviousItem.type !== 'folder'"
                            :navigation-element="lastPreviousItem"
                            alternative-name="Alle anzeigen"
                            @click="(navigationElement, categoryLink, options) => $emit('click', lastPreviousItem, categoryLink, options)"
                        />

                        <!-- display the currently visible categories -->
                        <template
                            v-for="navigationElement in navigationElements"
                            :key="navigationElement.id"
                        >
                            <LazyLayoutHeaderNavigationLink
                                :navigation-element="navigationElement"
                                :show-as-link="navigationElement.childCount === 0"
                                @click="(navigationElement, categoryLink, options) => $emit('click', navigationElement, categoryLink, options)"
                            />
                        </template>
                    </div>
                </LazyUiSheetDescription>
            </LazyUiSheetHeader>
        </LazyUiSheetContent>
    </UiSheet>
</template>
