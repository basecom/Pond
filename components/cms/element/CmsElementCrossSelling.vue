<script setup lang="ts">
import type { CmsElementCrossSelling } from '@shopware-pwa/composables-next';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { SwiperNavigation } from '#imports';

const props = defineProps<{
    element: CmsElementCrossSelling;
}>();

const { crossSellings } = props.element.data;

console.log(props.element);
const breakpoints = useBreakpoints(breakpointsTailwind);
const isSm = breakpoints.smaller('md')
</script>

<template>
    <LayoutSlider
        :navigation-arrows="'outside'"
        :navigation-dots="null"
        :autoplay="false"
        :number-of-slides="10"
        :items-to-show="4"
    >
        <template v-for="i in 10" :key="i">
            <LayoutSliderSlide >
                <div class="h-44 bg-brand-secondary">{{i}}</div>
            </LayoutSliderSlide>
        </template>
    </LayoutSlider>
<!--    <Swiper-->
<!--        :modules="[SwiperPagination, SwiperNavigation]"-->
<!--        :slides-per-view="3"-->
<!--        :loop="false"-->
<!--    >-->
<!--&lt;!&ndash;        <SwiperSlide v-for="product in crossSellings[0].products" :key="product.id">&ndash;&gt;-->
<!--        <SwiperSlide v-for="slide in 10" :key="slide">-->
<!--            <div class="h-44 bg-status-success mr-2">{{ slide }}</div>-->
<!--            &lt;!&ndash;            <LayoutSliderSlide&ndash;&gt;-->
<!--            &lt;!&ndash;                v-for="product in crossSelling.products"&ndash;&gt;-->
<!--            &lt;!&ndash;                :key="`cross-selling-${crossSelling.crossSelling.id}-product-${product.id}`"&ndash;&gt;-->
<!--            &lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;            <div>&ndash;&gt;-->

<!--&lt;!&ndash;                            <ProductCard :product="product" />&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--            &lt;!&ndash;            </LayoutSliderSlide>&ndash;&gt;-->
<!--        </SwiperSlide>-->
<!--    </Swiper>-->
<!--    <div-->
<!--        v-for="crossSelling in crossSellings"-->
<!--        :key="`cross-selling-${crossSelling.crossSelling.id}`"-->
<!--        class="flex flex-col gap-4"-->
<!--    >-->
<!--    </div>-->
<!--    <div-->
<!--        v-for="crossSelling in crossSellings"-->
<!--        :key="`cross-selling-${crossSelling.crossSelling.id}`"-->
<!--        class="flex flex-col gap-4"-->
<!--    >-->
<!--        <span class="text-xl font-bold">-->
<!--            {{ getTranslatedProperty(crossSelling.crossSelling, 'name') }}-->
<!--        </span>-->
<!--        &lt;!&ndash;        :items-to-show="isMobile ? 1 : 4"&ndash;&gt;-->
<!--        &lt;!&ndash;        :items-to-scroll="isMobile? 1 : 4"&ndash;&gt;-->
<!--        <LayoutSlider-->
<!--            :number-of-slides="crossSelling.products.length"-->
<!--            :items-to-show="4"-->
<!--            :items-to-scroll="2"-->
<!--            :breakpoints="breakpointSliderConfig"-->
<!--            navigation-arrows="inside"-->
<!--            :wrap-around="false"-->
<!--            class="w-full"-->
<!--        >-->
<!--            <LayoutSliderSlide-->
<!--                v-for="product in crossSelling.products"-->
<!--                :key="`cross-selling-${crossSelling.crossSelling.id}-product-${product.id}`"-->
<!--            >-->
<!--                <ProductCard :product="product" />-->
<!--            </LayoutSliderSlide>-->
<!--        </LayoutSlider>-->
<!--    </div>-->
</template>
