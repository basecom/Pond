<script setup lang="ts">
defineProps<{
  controller: ReturnType<typeof useModal>;
  imageClasses: string;
  slides: [];
  isZoomEnabled: boolean;
  sliderIndex: number;
  thumbsSwiper: string;
}>();

const zoomScale = ref(1);
const zoomIn = () => {
  console.log('scla', zoomScale.value);
  if(zoomScale.value < 2) {
    zoomScale.value = zoomScale.value + 0.25;
  }
}

const zoomOut = () => {
  console.log('scla', zoomScale.value);
  if(zoomScale.value > 1) {
    zoomScale.value = zoomScale.value - 0.25;
  }
}

</script>
<template>
    <LazySharedModal :controller="controller" :showHeader="false" :withCloseButton="true">
      <template #content>
        <button @click="zoomIn">
          Zoom in
        </button>
        <button @click="zoomOut">
          Zoom out
        </button>
        <LayoutSlider
            :classes="[
                        slides.length > 1 ? 'cursor-grab' : '',
                        'w-auto',
                    ]"
            :navigation-dots="false"
            :navigation-arrows="true"
            :thumbs-swiper="thumbsSwiper"
            :initialSlide="sliderIndex"
        >
          <LayoutSliderSlide
              v-for="slide in slides"
              :key="slide.media.id"
          >
            <div class="overflow-scroll">
              <img
                  v-if="slide.media.url"
                  :src="slide.media.url"
                  :alt="slide.translated?.alt ?? $t('cms.element.imageAlt')"
                  class="h-full w-full object-center"
                  :class="imageClasses"
                  :style="{transform: `scale(${zoomScale}, ${zoomScale})`}"
              />
            </div>
          </LayoutSliderSlide>
        </LayoutSlider>
      </template>
    </LazySharedModal>
</template>