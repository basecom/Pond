import type { ComputedRef, ImgHTMLAttributes, Ref } from 'vue';

export function useMedia(width: Ref<number>, height: Ref<number>, imageAttrs: ComputedRef<ImgHTMLAttributes>) {
    const DEFAULT_THUMBNAIL_SIZE = 10;

    const roundUp = (num: number) => {
        return num ? Math.ceil(num / 100) * 100 : DEFAULT_THUMBNAIL_SIZE;
    };

    const srcPath = computed(() => {
        const biggestParam =
            width.value > height.value ? `width=${roundUp(width.value)}` : `height=${roundUp(height.value)}`;
        return `${imageAttrs.value.src}?${biggestParam}&fit=crop,smart`;
    });

    return {
        srcPath,
    };
}
