export type ProductSliderConfig = {
    showNavigation: boolean;
    autoSlide: boolean;
    slides: ComputedRef<unknown[]>;
    breakpoints: Record<number, { slidesPerView: number }>;
    slidesPerView: number;
};

export function useComputeSliderConfig({
    showNavigation,
    autoSlide,
    slides,
    breakpoints,
    slidesPerView,
}: ProductSliderConfig) {
    const breakPointsConfig = {
        sm: 540,
        md: 768,
        lg: 1024,
    };
    const breakPoints = useBreakpoints(breakPointsConfig);
    const isSm = breakPoints.greater('sm');
    const isMd = breakPoints.greater('md');
    const isLg = breakPoints.greater('lg');
    const currentSlidesPerView = computed(() => {
        if (isLg.value) {
            return breakpoints[1024]?.slidesPerView ?? slidesPerView;
        }

        if (isMd.value) {
            return breakpoints[768]?.slidesPerView ?? slidesPerView;
        }

        if (isSm.value) {
            return breakpoints[540]?.slidesPerView ?? slidesPerView;
        }

        return slidesPerView;
    });

    const showNavigationArrows = computed(() => showNavigation && slides.value?.length > currentSlidesPerView.value);
    const shouldAutoSlide = computed(() => autoSlide && slides.value?.length > currentSlidesPerView.value);

    return {
        currentSlidesPerView,
        showNavigationArrows,
        shouldAutoSlide,
    };
}
