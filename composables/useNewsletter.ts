import { useNewsletter as coreUseNewsletter } from '@shopware-pwa/composables-next';

// Extend default newsletter composable
// Add newsletterConfirm method
export type ExtendedUseNewsletterReturn = UseNewsletterReturn & {
    newsletterConfirm(email: string, hash: string): Promise<void>;
};

export function useNewsletter(): ExtendedUseNewsletterReturn {
    const coreNewsletter = coreUseNewsletter();
    const { apiClient } = useShopwareContext();

    async function newsletterConfirm(email: string, hash: string) {
        await apiClient.invoke('confirmNewsletter post /newsletter/confirm', {
            body: {
                em: email,
                hash: hash,
            },
        });
    }

    return {
        ...coreNewsletter,
        newsletterConfirm,
    };
}
