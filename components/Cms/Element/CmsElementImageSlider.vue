<script setup lang="ts">
const props = defineProps<{
    element: CmsElementImageSlider;
}>();

const config = useCmsElementConfig(props.element);
const sliderItems = config.getConfigValue('sliderItems');
</script>

<template>
    <SharedSlider
        :navigation-arrows="config.getConfigValue('navigationArrows')"
        :navigation-dots="config.getConfigValue('navigationDots')"
        :autoplay="config.getConfigValue('autoSlide') ? config.getConfigValue('autoplayTimeout') : false"
        :number-of-slides="sliderItems.length"
    >
        <template
            v-for="(sliderItem, index) in sliderItems"
            :key="index"
        >
            <SharedSliderSlide>
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
            </SharedSliderSlide>
        </template>
    </SharedSlider>
</template>
