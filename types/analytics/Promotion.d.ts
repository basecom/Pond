import type { TrackingLineItem } from './LineItem';

export type TrackingPromotionEvent = {
    creative_slot: string;
    creative_name: string;
    promotion_id: string;
    promotion_name: string;
    ecommerce?: {
        items: TrackingLineItem[];
    };
};

export type PromotionInfo = {
    creative_slot: string;
    creative_name: string;
    promotion_id: string;
    promotion_name: string;
};
