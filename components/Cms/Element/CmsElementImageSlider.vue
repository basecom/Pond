<script setup lang="ts">
const props = defineProps<{
    element: CmsElementImageSlider;
}>();

const config = useCmsElementConfig(props.element);
const sliderItems = config.getConfigValue('sliderItems');
</script>

<template>
    <LayoutSlider
        :navigation-arrows="config.getConfigValue('navigationArrows')"
        :navigation-dots="config.getConfigValue('navigationDots')"
        :autoplay="config.getConfigValue('autoSlide') ? config.getConfigValue('autoplayTimeout') : false"
        :number-of-slides="sliderItems.length"
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
