import type { UseLazyLoad } from '../../types/cms/cmsVisibility';

export function useImageLazyLoad(): UseLazyLoad<HTMLImageElement> {
    const isElementLoaded = (element: HTMLImageElement) => element.complete;

    const watchElementLoaded = (element: HTMLImageElement, callback: () => void) => {
        if (isElementLoaded(element)) {
            callback();
            return;
        }

        const onImageLoad = () => {
            callback();
            element.removeEventListener('load', onImageLoad);
            element.removeEventListener('error', onImageLoad);
        };

        element.addEventListener('load', onImageLoad);
        element.addEventListener('error', onImageLoad);
    };

    return {
        isElementLoaded,
        watchElementLoaded,
    };
}
