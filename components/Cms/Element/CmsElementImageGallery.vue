<script setup lang="ts">
import type { CmsElementImageGallery } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementImageGallery;
}>();

const mediaGallery = computed(() => props.element.data?.sliderItems ?? []);
const elementConfig = computed(() => props.element.config);

// Main slider html object
const galleryRef = ref(null);
// Thumbnails slider html object
const thumbnailRef = ref(null);

const thumbnailSlidesPerView = 3;
const slides = ref(Array.from({ length: mediaGallery.value.length }));

// Only initialize sliders if there is at least one image
if (mediaGallery.value.length > 0) {
    // Main slider swiper instance
    useSwiper(galleryRef, {
        navigation: elementConfig.value?.navigationArrows.value !== 'None',
        pagination: elementConfig.value?.navigationDots.value !== 'None',
        loop: true,
    });

    // Thumbnail slider swiper instance
    useSwiper(thumbnailRef, {
        direction: elementConfig.value?.galleryPosition.value === 'left' ? 'vertical' : 'horizontal',
        spaceBetween: 16,
        loop: true,
        slidesPerView: thumbnailSlidesPerView,
    });
}
</script>

<template>
    <ClientOnly>
        <div
            class="flex max-h-[640px] gap-4"
            :class="
                elementConfig.galleryPosition.value === 'underneath'
                    ? 'max-h-full flex-col flex-wrap'
                    : 'flex-row-reverse'
            "
        >
            <template v-if="mediaGallery.length > 0">
                <swiper-container
                    ref="galleryRef"
                    :class="{
                    'cursor-grab': mediaGallery.length > 1,
                    'w-full': elementConfig.galleryPosition.value === 'underneath',
                    'w-4/5': elementConfig.galleryPosition.value !== 'underneath',
                }"
                    :thumbs-swiper="`.thumbnailRef-${element.id}`"
                >
                    <swiper-slide
                        v-for="(slide, idx) in slides"
                        :key="element.id + '-' + idx"
                    >
                        <img
                            :src="mediaGallery[idx].media.url"
                            :alt="mediaGallery[idx].media.translated.alt"
                            class="h-full w-full object-cover object-center"
                        />
                    </swiper-slide>
                </swiper-container>

                <swiper-container
                    ref="thumbnailRef"
                    :class="[
                    'thumbnailRef-' + element.id,
                    {
                        'cursor-grab': mediaGallery.length > thumbnailSlidesPerView,
                        'w-full': elementConfig.galleryPosition.value === 'underneath',
                        'w-1/5': elementConfig.galleryPosition.value !== 'underneath',
                    },
                ]"
                >
                    <swiper-slide
                        v-for="(slide, idx) in slides"
                        :key="element.id + '-' + idx"
                        class="group"
                    >
                        <img
                            :src="mediaGallery[idx].media.url"
                            :alt="mediaGallery[idx].media.translated.alt"
                            class="h-full w-full object-cover object-center opacity-40 group-[.swiper-slide-thumb-active]:border-2 group-[.swiper-slide-thumb-active]:border-brand-primary group-[.swiper-slide-thumb-active]:opacity-100"
                        />
                    </swiper-slide>
                </swiper-container>
            </template>

            <template v-else>
                <div class="w-full bg-gray-light">
                    <SharedImagePlaceholder :size="'lg'" />
                </div>
            </template>
        </div>
    </ClientOnly>
</template>
