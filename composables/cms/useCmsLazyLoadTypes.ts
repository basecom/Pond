import type { LazyLoadTypes, UseLazyLoad } from '../../types/cms/cmsVisibility';

export function useCmsLazyLoadMappings() {
    const mapping: Record<LazyLoadTypes, () => UseLazyLoad> = {
        image: useImageLazyLoad as () => UseLazyLoad,
    };

    const getLazyLoadComposable = (type: LazyLoadTypes): () => UseLazyLoad => mapping[type];

    return {
        getLazyLoadComposable,
    };

}
