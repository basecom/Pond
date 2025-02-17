import type { LazyLoadTypes, UseLazyLoad } from '../../types/cms/cmsVisibility';

export function useCmsLazyLoadTypes() {
    const mapping: Record<LazyLoadTypes, () => UseLazyLoad> = {
        image: useImageLazyLoad as () => UseLazyLoad,
    };

    const getLazyLoadComposable = (type: LazyLoadTypes): () => UseLazyLoad => {
        return mapping[type];
    }

    return {
        getLazyLoadComposable,
    };

}