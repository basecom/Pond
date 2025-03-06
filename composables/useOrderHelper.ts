export function useOrderHelper(){
    const { createOrder } = useCheckout();
    const { sessionContext } = useSessionContext();

    const createOrderWrapper = async (params?: { campaignCode?: string; customerComment?: string })=>{
        const affiliateCode = sessionStorage.getItem("affiliateCode") ?? sessionContext.value.customer.affiliateCode ?? null;

        if (affiliateCode) {
            return await createOrder({ ...params, affiliateCode: affiliateCode })
        } else {
            return await createOrder({ ...params });
        }
    }

    return {
        createOrderWrapper
    }
}
