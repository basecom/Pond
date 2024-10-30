import type { TrackingLineItem } from './line-item';

export type TrackingEcommerceEvent = {
    value?: number;
    currency?: string;
    coupon?: string;
    shipping_tier?: string;
    payment_type?: string;
    transaction_id?: string;
    tax?: number;
    shipping?: number;
    items: TrackingLineItem[];
};