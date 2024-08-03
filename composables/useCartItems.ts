import type { Schemas } from '@shopware/api-client/api-types';

export function useCartItems() {
    const getCartItemsCount = (cartItems: Schemas['LineItem'][]): number => {
        return cartItems.reduce((acc: number, lineItem: Schemas['LineItem']) => {
            return acc + lineItem.quantity;
        }, 0);
    };

    return { getCartItemsCount };
}
