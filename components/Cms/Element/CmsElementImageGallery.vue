<script setup lang="ts">
import type { CmsElementImageGallery } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementImageGallery;
}>();

const { getProductCover } = useMedia();

const mediaGallery = computed(() => props.element.data?.sliderItems ?? []);

const productCover = getProductCover(mediaGallery.value[0], 'l');
</script>

<template>
    <img
        :src="productCover.url"
        :alt="productCover.alt"
        class="h-full w-full object-cover object-center"
    />
</template>