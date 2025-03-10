import { useContext } from '#imports';
import type { Schemas } from '@shopware/api-client/api-types';

export const useCartStore = defineStore('cart', () => {
    const { refreshCart: _refreshCart } = useCart();

    const _storeCart = useContext<Schemas['Cart']>('swCart');
    const cart = useState<Schemas['Cart'] | null>('cart', () => null);

    const refreshCart = async () => {
        cart.value = await _refreshCart();
    };

    const reloadCartFromSsr = async () => {
        if (cart.value) {
            _storeCart.value = cart.value;
        }
    };

    return {
        refreshCart,
        reloadCartFromSsr,
    };
});
