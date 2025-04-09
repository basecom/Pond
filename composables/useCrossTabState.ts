import { nanoid } from 'nanoid';

export function useCrossTabState() {
    // Only run this code on the client side to avoid SSR issues
    if (import.meta.server) return;

    const { sessionContext, refreshSessionContext } = useSessionContext();
    const { cart, refreshCart } = useCart();

    const tabId = ref(nanoid());
    const refreshingCart = shallowRef(false);
    const refreshingSession = shallowRef(false);

    // Cookies to track changes
    const cartUpdateCookie = useCookie('cart-update', {
        default: () => ({ tabId: '', timestamp: 0 }),
        watch: true,
        maxAge: 86400
    });

    const sessionUpdateCookie = useCookie('session-update', {
        default: () => ({ tabId: '', timestamp: 0 }),
        watch: true,
        maxAge: 86400
    });

    // Watch for cart changes in current tab
    watch(cart, () => {
        if (!refreshingCart.value) {
            cartUpdateCookie.value = {
                tabId: tabId.value,
                timestamp: Date.now()
            };
        }
    });

    // Watch for session changes in current tab
    watch(sessionContext, () => {
        if (!refreshingSession.value) {
            sessionUpdateCookie.value = {
                tabId: tabId.value,
                timestamp: Date.now()
            };
        }
    });

    // Watch for cart cookie changes from other tabs
    watch(cartUpdateCookie, async (newValue, oldValue) => {
        // Only refresh if it's a new update from another tab
        if (newValue &&
            newValue.tabId !== tabId.value &&
            (!oldValue || newValue.timestamp > oldValue.timestamp))
        {
            refreshingCart.value = true;

            try {
                await refreshCart();
            } catch (error) {
                console.error('Error refreshing cart:', import.meta.dev ? error : '');
            } finally {
                refreshingCart.value = false;
            }
        }
    });

    // Watch for session cookie changes from other tabs
    watch(sessionUpdateCookie, async (newValue, oldValue) => {
        // Only refresh if it's a new update from another tab
        if (newValue &&
            newValue.tabId !== tabId.value &&
            (!oldValue || newValue.timestamp > oldValue.timestamp))
        {
            refreshingSession.value = true;

            try {
                await refreshSessionContext();
            } catch (error) {
                console.error('Error refreshing session:', import.meta.dev ? error : '');
            } finally {
                refreshingSession.value = false;
            }
        }
    });
}
