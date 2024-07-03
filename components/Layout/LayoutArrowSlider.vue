<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components';
export interface LayoutArrowSliderProps {
    containerClasses?: string;
    buttonClasses?: string;
}
withDefaults(defineProps<LayoutArrowSliderProps>(), {
    containerClasses: '',
    buttonClasses: '',
});

const buttonNext = ref<HTMLButtonElement | null>(null);
const buttonPrev = ref<HTMLButtonElement | null>(null);
const arrowSlider = ref<HTMLDivElement | null>(null);
const isOverflow = ref(false);
const isStart = ref(true);
const isEnd = ref(false);

interface IntersectionObserverEntry {
    isIntersecting: boolean;
    // Add any other properties you might use from the IntersectionObserverEntry
}

function onIntersectionObserverStart([{ isIntersecting }]: IntersectionObserverEntry[]) {
    isStart.value = isIntersecting;
}

function onIntersectionObserverEnd([{ isIntersecting }]: IntersectionObserverEntry[]) {
    isEnd.value = isIntersecting;
}

function scrollToNextPage() {
    const scrollWidth = (arrowSlider.value?.clientWidth ?? 0) * 0.3;
    arrowSlider.value?.scrollBy(scrollWidth, 0);
}

function scrollToPrevPage() {
    const scrollWidth = (arrowSlider.value?.clientWidth ?? 0) * 0.3;
    arrowSlider.value?.scrollBy(-scrollWidth, 0);
}

watch(arrowSlider, () => {
    const element = arrowSlider.value;

    if (!element) {
        return;
    }

    isOverflow.value = element.scrollWidth > element.clientWidth;
});
</script>

<template>
    <div class="relative">
        <div
            ref="arrowSlider"
            class="no-scrollbar flex snap-x items-center overflow-scroll scroll-smooth"
            :class="{ containerClasses: isOverflow }"
        >
            <button
                v-if="isOverflow && !isStart"
                ref="buttonPrev"
                class="btn prev from-neutral-white via-neutral-white absolute bottom-0 left-0 top-0 z-10 flex h-full w-14 items-center bg-gradient-to-r to-transparent"
                :class="[buttonClasses]"
                @click="scrollToPrevPage"
            >
                <LayoutIcon class="fill-neutral-black h-4 w-4" icon="caret-left" />
            </button>
            <span v-intersection-observer="onIntersectionObserverStart" class="pointer-events-none w-0"> &nbsp; </span>
            <slot />
            <span v-intersection-observer="onIntersectionObserverEnd" class="pointer-events-none w-0"> &nbsp; </span>
            <button
                v-if="isOverflow && !isEnd"
                ref="buttonNext"
                class="btn next from-neutral-white via-neutral-white absolute bottom-0 right-0 top-0 z-10 flex h-full w-14 items-center justify-end bg-gradient-to-l to-transparent"
                :class="[buttonClasses]"
                @click="scrollToNextPage"
            >
                <LayoutIcon class="fill-neutral-black h-4 w-4" icon="caret-right" />
            </button>
        </div>
    </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
