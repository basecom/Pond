export function useOrderHelper(){
    const { createOrder } = useCheckout();

    const createOrderWrapper = async (params?: { campaignCode?: string; customerComment?: string })=>{
        const affiliateCode = useSessionStorage('affiliateCode');

        if (affiliateCode.value) {
            return await createOrder({ ...params, affiliateCode: affiliateCode.value });
        } 
        return await createOrder({ ...params });
        
    };

    return {
        createOrderWrapper,
    };
}
