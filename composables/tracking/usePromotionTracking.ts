import type { Schemas } from '@shopware/api-client/api-types';
import type { PromotionInfo, TrackingPromotionEvent } from '~/types/analytics/Promotion';

export function usePromotionTracking() {
    const { getTrackingItem } = useItemTracking();
    const _currentProduct = ref<Schemas['Product'] | undefined>(undefined);
    const _currentProductPrice = useProductPrice(_currentProduct);

    const getTrackingPromotionEvent = (
        promotion: PromotionInfo,
        product?: Schemas['Product'],
        itemId?: number,
    ): TrackingPromotionEvent => {
        const promotionEvent: TrackingPromotionEvent = {
            ...promotion,
        };
        if (product) {
            _currentProduct.value = product;

            const item = getTrackingItem({
                itemIndex: itemId ?? 1,
                quantity: 1,
                price: _currentProductPrice.price.value,
                product,
            });

            promotionEvent.ecommerce = {
                items: [item],
            };
        }

        return promotionEvent;
    };

    return {
        getTrackingPromotionEvent,
    };
}
