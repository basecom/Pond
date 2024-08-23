<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Glide from '@glidejs/glide';

const props = withDefaults(
    defineProps<{
        autoplay?: boolean;
        itemsToShow?: number;
        itemsToScroll?: number;
        numberOfSlides?: number;
        wrapAround?: boolean;
        navigationArrows?: null | 'inside' | 'outside';
        navigationDots?: null | 'inside' | 'outside';
        gap?: number;
        imagePreview?: null | 'left' | 'bottom';
    }>(),
    {
        autoplay: false,
        itemsToShow: 1,
        itemsToScroll: 1,
        numberOfSlides: -1,
        wrapAround: true,
        navigationArrows: null,
        navigationDots: null,
        gap: 16,
        imagePreview: null,
    },
);

const glide: Ref<Glide | undefined> = ref(undefined);
const activeIndex = ref(0);
const layoutSliderRef = ref();

onMounted(async () => {
    glide.value = new Glide(layoutSliderRef.value, {
        type: props.wrapAround ? 'carousel' : 'slider',
        perView: props.itemsToShow,
        autoplay: props.autoplay,
        cloningRatio: props.wrapAround ? 1 : 0,
        rewind: 0,
        bound: true,
        gap: props.gap,
        touchRatio: 1,
    });
    await glide.value.mount();
    console.log(glide.value);

    glide.value.on('run.after', () => {
        activeIndex.value = glide.value.index;
    });
});

onUnmounted(() => {
    glide?.value?.destroy();
});

const goToSlide = (index: number) => {
    glide.value.go(`=${index}`);
    activeIndex.value = index;
};
</script>

<template>
    <div
        ref="layoutSliderRef"
        class="glide"
        :class="{
            'flex gap-4': imagePreview === 'left',
        }"
    >
        <div
            v-if="imagePreview === 'left'"
            class="hidden w-4/12 md:block"
        >
            <slot name="imagePreview"></slot>
        </div>

        <div class="relative">
            <div
                class="glide__track"
                data-glide-el="track"
            >
                <ul class="glide__slides">
                    <slot></slot>
                </ul>
            </div>

            <div
                v-if="navigationArrows"
                class="glide__arrows absolute inset-0 flex items-center"
                data-glide-el="controls"
            >
                <button
                    class="glide__arrow glide__arrow--left absolute"
                    :class="{
                        '-left-6': navigationArrows === 'outside',
                        'left-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-light/50':
                            navigationArrows === 'inside',
                    }"
                    data-glide-dir="<"
                    @click="activeIndex === 0 ? (activeIndex = numberOfSlides - 1) : activeIndex--"
                >
                    <FormKitIcon
                        icon="chevron-left"
                        class="inline-block h-4 w-auto"
                    />
                </button>
                <button
                    class="glide__arrow glide__arrow--right absolute"
                    :class="{
                        '-right-6': navigationArrows === 'outside',
                        'right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-light/50':
                            navigationArrows === 'inside',
                    }"
                    data-glide-dir=">"
                    @click="activeIndex === numberOfSlides - 1 ? (activeIndex = 0) : activeIndex++"
                >
                    <FormKitIcon
                        icon="chevron-right"
                        class="inline-block h-4 w-auto"
                    />
                </button>
            </div>

            <div
                v-if="navigationDots && numberOfSlides > 0"
                class="glide__bullets relative z-10 flex items-center justify-center gap-2"
                :class="{
                    'mt-4': navigationDots === 'outside',
                    'absolute bottom-8 w-full': navigationDots === 'inside',
                }"
            >
                <template
                    v-for="index in numberOfSlides"
                    :key="index"
                >
                    <button
                        class="glide__bullet h-4 w-4 cursor-pointer rounded-full"
                        :class="{
                            'bg-gray': activeIndex === index - 1 && navigationDots === 'outside',
                            'bg-gray/50': activeIndex !== index - 1 && navigationDots === 'outside',
                            'bg-gray-light': activeIndex === index - 1 && navigationDots === 'inside',
                            'bg-gray-light/50': activeIndex !== index - 1 && navigationDots === 'inside',
                        }"
                        :data-glide-dir="index - 1"
                        :aria-label="'Slide index ' + (index - 1)"
                        @click="goToSlide(index - 1)"
                    ></button>
                </template>
            </div>
        </div>

        <div
            v-if="imagePreview === 'bottom'"
            class="hidden md:block"
        >
            <slot name="imagePreview"></slot>
        </div>
    </div>
</template>
