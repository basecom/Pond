import { useProductConfigurator as coreUseProductConfigurator } from '@shopware-pwa/composables-next';
import type { Schemas } from '@shopware/api-client/api-types';

// Extend default product configurator composable
// Add findBestMatchingVariant method
export type ExtendedUseProductConfiguratorReturn = UseProductConfiguratorReturn & {
    findBestMatchingVariant(productId: string, options: string[], switchedGroup: string): Promise<Schemas['Product']|null>;
};

export function useProductConfigurator(): ExtendedUseProductConfiguratorReturn {
    const coreProductConfigurator = coreUseProductConfigurator();
    const { apiClient } = useShopwareContext();

    const findBestMatchingVariant = async (productId: string, options: string[], switchedGroup: string)=> {
        const match = await apiClient.invoke('searchProductVariantIds post /product/{productId}/find-variant', {
            pathParams: {
                productId,
            },
            body: {
                options,
                switchedGroup,
            },
        });

        const product = await apiClient.invoke('readProduct post /product', {
            body: {
                ids: [match.data.variantId],
                limit: 1,
                associations: {
                    seoUrls: {},
                },
                includes: {
                    seo_url: ['seoPathInfo'],
                },
            },
        });

        return product.data.elements?.[0];
    };

    return {
        ...coreProductConfigurator,
        findBestMatchingVariant,
    };
}
