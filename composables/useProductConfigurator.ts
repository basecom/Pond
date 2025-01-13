import { useProductConfigurator as coreUseProductConfigurator } from '@shopware-pwa/composables-next';

// Extend default product configurator composable
// Add findBestMatchingVariant method
export type ExtendedUseProductConfiguratorReturn = UseProductConfiguratorReturn & {
    findBestMatchingVariant(productId: string, options: string[], switchedGroup: string): Promise<void>;
};

export function useProductConfigurator(): ExtendedUseProductConfiguratorReturn {
    const coreProductConfigurator = coreUseProductConfigurator();
    const { apiClient } = useShopwareContext();

    async function findBestMatchingVariant(productId: string, options: string[], switchedGroup: string) {
        const match = await apiClient.invoke('searchProductVariantIds post /product/{productId}/find-variant', {
            pathParams: {
                productId: productId,
            },
            body: {
                options: options,
                switchedGroup: switchedGroup,
            },
        });

        const product = await apiClient.invoke('readProduct post /product', {
            body: {
                ids: [match.data.variantId],
                limit: 1,
            },
        });

        return product.data.elements?.[0];
    }

    return {
        ...coreProductConfigurator,
        findBestMatchingVariant,
    };
}
