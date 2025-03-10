import { useBroadcastChannel } from '@vueuse/core';

export function useBroadcastState(){
    const { sessionContext, refreshSessionContext } = useSessionContext();
    const { cart, refreshCart } = useCart();
    const justReceivedCart = ref(false);
    const justReceivedSession = ref(false);
    let cartResetTimeout;

    const {
        channel: sessionChannel,
        post,
    } = useBroadcastChannel({ name: 'session-store-channel' });
    const {
        channel: cartChannel,
        isSupported,
        post: postCart,
    } = useBroadcastChannel({ name: 'cart-store-channel' });


    watch(cart,  () => {
        if (isSupported.value){
            if (!justReceivedCart.value) {
                postCart('cart');
            } else {
                clearTimeout(cartResetTimeout);
                cartResetTimeout = setTimeout(() => {
                    justReceivedCart.value = false;
                }, 2000);
            }
        }
    });

    watch(cartChannel, () => {
        if (cartChannel.value){
            cartChannel.value.addEventListener('message', async()=> {
                justReceivedCart.value = true;
                await refreshCart();
            });
        }
    });

    watch(sessionContext,  () => {
        if (isSupported.value && !justReceivedSession.value && !justReceivedCart.value) {
            post('session');
        }
        if (justReceivedSession.value){
            justReceivedSession.value = false;
        }

    });

    watch(sessionChannel, () => {
        if (sessionChannel.value){
            sessionChannel.value.addEventListener('message', async()=>{
                justReceivedSession.value = true;
                await refreshSessionContext();
            });
        }
    });
}
