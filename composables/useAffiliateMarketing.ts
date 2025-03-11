export function useAffiliateMarketing(){
    const route = useRoute();
    const affiliateCode = useSessionStorage('affiliateCode', null, { deep: true, initOnMounted: true });

    const setAffiliateCode = async (queryParamKey: string) => {
        if (route.query[queryParamKey]) {
            affiliateCode.value = route.query[queryParamKey];
        }
    };

    return {
        affiliateCode,
        setAffiliateCode,
    };
}
