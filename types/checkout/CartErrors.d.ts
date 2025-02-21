export type CartErrors = {
    'promotion-not-found'?: PromotionCartError;
};

export type PromotionCartError = {
    promotionCode: string;
} & Schemas['Cart']['errors'];
