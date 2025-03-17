import { useBroadcastChannel } from '@vueuse/core';
import { nanoid } from 'nanoid';

export function useBroadcastState(){
    const { sessionContext, refreshSessionContext } = useSessionContext();
    const { cart, refreshCart } = useCart();

    const tabId = ref(nanoid());
    const refreshingCart = ref(false);
    const refreshingSession = ref(false);

    const {
        channel: sessionChannel,
        post: postSession,
    } = useBroadcastChannel({ name: 'session-store-channel' });
    
    const {
        channel: cartChannel,
        isSupported,
        post: postCart,
    } = useBroadcastChannel({ name: 'cart-store-channel' });

    watch(cart, () => {
        if (isSupported.value && !refreshingCart.value) {
            postCart({ tabId: tabId.value });
        }
    });

    watch(cartChannel, () => {
        if (cartChannel.value){
            cartChannel.value.addEventListener('message', async(event) => {
                if (event.data?.tabId !== tabId.value){
                    refreshingCart.value = true;
                    await refreshCart();
                    refreshingCart.value = false;
                }
            });
        }
    });

    watch(sessionContext,  () => {
        if (isSupported.value && !refreshingSession.value) {
            postSession({ tabId: tabId.value });
        }
    });

    watch(sessionChannel, () => {
        if (sessionChannel.value){
            sessionChannel.value.addEventListener('message', async(event) => {
                if (event.data?.tabId !== tabId.value){
                    refreshingSession.value = true;
                    await refreshSessionContext();
                    refreshingSession.value = false;
                }
            });
        }
    });
}
