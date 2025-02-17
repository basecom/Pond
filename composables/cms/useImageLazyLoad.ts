import type { UseLazyLoad } from '../../types/cms/cmsVisibility';

export function useImageLazyLoad(): UseLazyLoad<HTMLImageElement> {
    const isElementLoaded = (element: HTMLImageElement) => {
        return element.complete && element.naturalWidth !== 0;
    };

    const watchElementLoaded = (element: HTMLImageElement, cb: () => void) => {
        if (isElementLoaded(element)) {
            cb();
            return;
        }

        const onImageLoad = () => {
            cb();
            element.removeEventListener('load', onImageLoad);
            element.removeEventListener('error', onImageLoad);
        }

        element.addEventListener('load', onImageLoad);
        element.addEventListener('error', onImageLoad);
    };

    return {
        isElementLoaded,
        watchElementLoaded,
    };
}