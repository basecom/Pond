<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getCategoryUrl, getTranslatedProperty } from '@shopware/helpers';

const props = withDefaults(
    defineProps<{
      navigationElement: Schemas['Category'];
      classes?: { [key: string]: boolean };
      showAsLink?: boolean;
    }>(),
    {
        classes: undefined,
        showAsLink: true,
    },
);

const emits = defineEmits<{
  click: [navigationElement: Schemas['Category'], categoryLink: string|null, options?: {target: string}];
}>();

const { isExternalLink, isInternalLink, externalLink, loadInternalLink, path, linkNewTab } = usePondNavigationUtils(props.navigationElement);
if (isInternalLink) {
    await loadInternalLink();
}

const categoryLink = computed(() => {
    if (isExternalLink && externalLink) {
        return externalLink;
    }

    if (isInternalLink) {
        return path.value;
    }

    return getCategoryUrl(props.navigationElement);
});

const handleClick = () => {
    // if its an external link: link to it
    if (isExternalLink && externalLink) {
        navigateTo(categoryLink.value, {external: true, open: {target: '_blank'}});
        return;
    }

    // internal? push event
    // todo: does not work
    const options =linkNewTab ? {open: {target: '_blank'}} : {};
    emits('click', props.navigationElement, categoryLink, options);
};
</script>

<template>
    <LazyNuxtLinkLocale
        v-if="showAsLink && categoryLink"
        :to="categoryLink"
        :class="[classes, 'cursor-pointer border-b-2 border-gray-100 py-3']"
        @click.prevent="handleClick"
    >
        <slot name="link-name">
            {{ getTranslatedProperty(navigationElement, 'name') }}
        </slot>
    </LazyNuxtLinkLocale>

    <div
        v-else
        :class="[classes, 'flex cursor-pointer items-center border-b-2 border-gray-100 py-3']"
        @click="$emit('click', navigationElement, null)"
    >
        <slot name="item-name">
            {{ getTranslatedProperty(navigationElement, 'name') }}
        </slot>

        <span class="ml-auto">
            <slot name="item-icon">
                <Icon name="mdi:chevron-right" class="size-5" />
            </slot>
        </span>
    </div>
</template>
