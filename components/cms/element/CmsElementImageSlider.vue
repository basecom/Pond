<script setup lang="ts">
import { Swiper } from 'swiper/vue';

const props = defineProps<{
    element: CmsElementImageSlider;
}>();

const config = useCmsElementConfig(props.element);
const sliderItems = config.getConfigValue('sliderItems');
</script>

<template>
    <SharedSlider>
<!--        <div>-->

        <SwiperSlide
            v-for="i in 15"
            :key="i"
        >
            <div
            class="h-24 bg-gray-light flex items-center justify-center"
            >
            {{i}}

            </div>
        </SwiperSlide>
<!--        </div>-->
    </SharedSlider>
    <LayoutSlider
        :navigation-arrows="config.getConfigValue('navigationArrows')"
        :navigation-dots="config.getConfigValue('navigationDots')"
        :autoplay="config.getConfigValue('autoSlide') ? config.getConfigValue('autoplayTimeout') : false"
        :number-of-slides="sliderItems.length"
        :items-to-show="2"
    >
        <template
            v-for="(sliderItem, index) in sliderItems"
            :key="index"
        >
            <LayoutSliderSlide>
                <template v-if="sliderItem.url">
                    <NuxtLink
                        :to="sliderItem.url"
                        :target="sliderItem.newTab ? '_blank' : ''"
                    >
                        <img
                            :src="sliderItem.mediaUrl"
                            class="w-full object-cover"
                            :style="
                                config.getConfigValue('displayMode') === 'cover'
                                    ? `height: ${config.getConfigValue('minHeight')}`
                                    : ''
                            "
                            loading="lazy"
                        />
                    </NuxtLink>
                </template>
                <img
                    v-else
                    :src="sliderItem.mediaUrl"
                    class="w-full object-cover"
                    :style="
                        config.getConfigValue('displayMode') === 'cover'
                            ? `height: ${config.getConfigValue('minHeight')}`
                            : ''
                    "
                    loading="lazy"
                />
            </LayoutSliderSlide>
        </template>
    </LayoutSlider>
</template>
