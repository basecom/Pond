<script setup lang="ts">
import type { CmsElementImage } from '@shopware-pwa/composables-next';
import { buildUrlPrefix, getTranslatedProperty } from '@shopware-pwa/helpers-next';
import { useElementSize } from '@vueuse/core';
import type { CSSProperties } from 'vue';

const props = defineProps<{
    element: CmsElementImage;
}>();

const { getUrlPrefix } = useUrlResolver();
const imageElement = ref(null);
const { width, height } = useElementSize(imageElement);
const { getCmsMedia } = useMedia();
const { containerStyle, displayMode, imageContainerAttrs, imageAttrs, imageLink, isVideoElement, mimeType } =
    useCmsElementImage(props.element);

const { srcPath } = getCmsMedia(width, height, imageAttrs);

const imageComputedContainerAttrs = computed(() => {
    const imageAttrsCopy = Object.assign({}, imageContainerAttrs.value);
    if (imageAttrsCopy?.href) {
        imageAttrsCopy.href = buildUrlPrefix(imageAttrsCopy.href, getUrlPrefix()).path;
    }
    return imageAttrsCopy;
});

const getMinHeightAsHeight = (properties: CSSProperties) => {
    const height = properties.minHeight ?? '100%';
    return `height: ${height}`;
};

const mediaObject = computed(() => {
    return props.element.data.media;
});
</script>

<template>
    <component
        :is="imageLink.url ? 'a' : 'div'"
        v-if="imageAttrs.src"
        class="relative h-full w-full"
        :style="containerStyle"
        v-bind="imageComputedContainerAttrs"
    >
        <video
            v-if="isVideoElement"
            controls
            :class="{
                'h-full w-full': true,
                'object-cover': displayMode === 'cover',
            }"
        >
            <source
                :src="imageAttrs.src"
                :type="mimeType"
            />
            {{ $t('cms.element.videoTagNotSupported') }}
        </video>

        <img
            v-else
            ref="imageElement"
            loading="lazy"
            :class="{
                'h-full w-full': true,
                'object-cover': displayMode === 'cover',
            }"
            :style="displayMode === 'cover' ? getMinHeightAsHeight(containerStyle) : ''"
            :alt="getTranslatedProperty(mediaObject, 'alt')"
            :title="getTranslatedProperty(mediaObject, 'title')"
            :src="srcPath"
            :srcset="imageAttrs.srcset"
        />
    </component>
</template>
