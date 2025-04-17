<script setup lang="ts">
import type { CmsElementImage } from '@shopware-pwa/composables-next';
import { buildUrlPrefix, getTranslatedProperty } from '@shopware-pwa/helpers-next';
import { useElementSize } from '@vueuse/core';

const props = defineProps<{
    element: CmsElementImage;
}>();

const { getUrlPrefix } = useUrlResolver();
const { shouldPreloadElement } = useCmsElementPreload();
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

const mediaObject = props.element.data?.media;
const shouldPreloadImage = shouldPreloadElement(props.element);
if (shouldPreloadImage && !isVideoElement.value) {
    useImagePreload({
        src: srcPath.value,
        srcset: imageAttrs.value.srcset,
        alt: getTranslatedProperty(mediaObject, 'alt'),
    });
}
</script>

<template>
    <component
        :is="imageLink.url ? 'a' : 'div'"
        v-if="imageAttrs.src"
        class="relative block w-full"
        :class="displayMode === 'cover' ? 'h-full' : ''"
        :style="displayMode === 'cover' ? containerStyle : ''"
        v-bind="imageComputedContainerAttrs"
    >
        <video
            v-if="isVideoElement"
            controls
            :class="{
                'size-full': true,
                'object-cover': displayMode === 'cover',
            }"
        >
            <source
                :src="imageAttrs.src"
                :type="mimeType"
            >
            {{ $t('cms.element.videoTagNotSupported') }}
        </video>

        <img
            v-else
            ref="imageElement"
            v-cms-element-lazy-load="{ id: mediaObject.id ?? srcPath, type: 'image' }"
            :loading="shouldPreloadImage ? 'eager' :  'lazy'"
            :class="{
                'w-full': true,
                'absolute inset-0 h-full object-cover': displayMode === 'cover',
            }"
            :alt="getTranslatedProperty(mediaObject, 'alt') || mediaObject?.fileName || $t('cms.element.imageAlt')"
            :title="getTranslatedProperty(mediaObject, 'title') || mediaObject?.fileName || $t('cms.element.imageAlt')"
            :src="srcPath"
            :srcset="imageAttrs.srcset"
        >
    </component>
</template>
