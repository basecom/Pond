import type { TrackingLineItem } from './line-item';

export type TrackingCartEvent = {
    value: number;
    currency: string;
    items: TrackingLineItem[];
};