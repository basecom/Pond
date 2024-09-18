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

const slides = ref(Array.from({ length: mediaGallery.value.length }));

// Main slider swiper instance
const swiperGallery = useSwiper(galleryRef, {
    navigation: elementConfig.value?.navigationArrows.value !== 'None',
    pagination: elementConfig.value?.navigationDots.value !== 'None',
    loop: true,
    spaceBetween: 16,
});

const thumbnailSlidesPerView = 3;

// Thumbnail slider swiper instance
const swiperThumbnails = useSwiper(thumbnailRef, {
    direction: elementConfig.value?.galleryPosition.value === 'left' ? 'vertical' : 'horizontal',
    spaceBetween: 16,
    loop: true,
    slidesPerView: thumbnailSlidesPerView,
});
</script>

<template>
    <ClientOnly>
        <div class="flex gap-4 max-h-[640px]" :class="elementConfig.galleryPosition.value === 'underneath' ? 'flex-wrap flex-col max-h-full' : 'flex-row-reverse'">
            <swiper-container ref="galleryRef"
                              :class="{
                                'cursor-grab': mediaGallery.length > 1,
                                'w-full': elementConfig.galleryPosition.value === 'underneath',
                                'w-4/5': elementConfig.galleryPosition.value !== 'underneath'
                              }"
                              thumbs-swiper=".thumbnailRef"
            >
                <swiper-slide
                    v-for="(slide, idx) in slides"
                    :key="idx"
                >
                    <img
                        :src="mediaGallery[idx].media.url"
                        :alt="mediaGallery[idx].media.translated.alt"
                        class="h-full w-full object-cover object-center"
                    />
                </swiper-slide>
            </swiper-container>

            <swiper-container ref="thumbnailRef"
                              class="thumbnailRef"
                              :class="{
                                'cursor-grab': mediaGallery.length > thumbnailSlidesPerView,
                                'w-full': elementConfig.galleryPosition.value === 'underneath',
                                'w-1/5': elementConfig.galleryPosition.value !== 'underneath'
                              }"
            >
                <swiper-slide
                    v-for="(slide, idx) in slides"
                    :key="idx"
                    class="group"
                >
                    <img
                        :src="mediaGallery[idx].media.url"
                        :alt="mediaGallery[idx].media.translated.alt"
                        class="h-full w-full object-cover object-center opacity-40 group-[.swiper-slide-thumb-active]:border-brand-primary group-[.swiper-slide-thumb-active]:border-2 group-[.swiper-slide-thumb-active]:opacity-100"
                    />
                </swiper-slide>
            </swiper-container>
        </div>
    </ClientOnly>
</template>
