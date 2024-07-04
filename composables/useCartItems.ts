import type {LineItem} from '@shopware-pwa/types';

export function useCartItems() {
    const getCartItemsCount = (cartItems: LineItem[]): number => {
        return cartItems.reduce((acc: number, lineItem: LineItem) => {
            return acc + lineItem.quantity;
        }, 0);
    };

    return {getCartItemsCount};
}
