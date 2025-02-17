import type { Schemas } from '@shopware/api-client/api-types';
import type { CmsPageConfig } from '../types/cms/cmsVisibility';

export default defineNuxtPlugin( (nuxtApp) => {
    const pageConfig = ref<CmsPageConfig | null>(null);

    nuxtApp.payload.data['cmsPageConfig'] = pageConfig;

    nuxtApp.vueApp.directive<HTMLElement, Schemas['CmsPage']>('cms-page', {
        getSSRProps (binding) {
            const { setSsrCmsPage, getSsrPageAttributes } = useCmsPageVisibility(pageConfig);

            setSsrCmsPage(binding.value);

            return getSsrPageAttributes();
        }
    });

    nuxtApp.vueApp.directive<HTMLElement, Schemas['CmsSlot']>('cms-element', {
        getSSRProps : (binding) => {
            const { setSsrCmsElement, getSsrElementAttributes } = useCmsElementVisibility(pageConfig);

            setSsrCmsElement(binding.value);

            return getSsrElementAttributes();
        }
    });

    nuxtApp.vueApp.directive<{ id: string; type: string; }>('cms-element-lazy-load', {
        getSSRProps: (binding) => {
            const { setSsrLazyLoad, getSsrPageAttributes } = useCmsLazyLoad(pageConfig);
            const cmsElementId =  inject<string>('cmsElementId');

            if (!cmsElementId) {
                return;
            }

            setSsrLazyLoad(cmsElementId, {
                id: binding.value.id,
                type: binding.value.type,
                loaded: false,
            });

            return getSsrPageAttributes();
        }
    })

});