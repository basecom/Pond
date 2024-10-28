import type { Schemas } from '@shopware/api-client/api-types';
import type { TrackingPromotionEvent } from '../../types/analytics/promotion';

export function usePromotionTracking() {
    const { getTrackingItem } = useItemTracking();
    const _currentProduct = ref<Schemas['Product'] | undefined>(undefined);
    const _currentProductPrice = useProductPrice(_currentProduct);
    const cmsBlock = useCmsBlock();

    const getTrackingPromotionEvent = (creativeName: string , product?: Schemas['Product'], itemId?: number): TrackingPromotionEvent => {
        const promotionEvent: TrackingPromotionEvent = {
            creative_name: creativeName,
            creative_slot: cmsBlock?.block.type ?? '',
            promotion_id: cmsBlock?.block.id ?? '',
            promotion_name: cmsBlock?.block.name ?? '',
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
    }
}