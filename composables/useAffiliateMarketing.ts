export function useAffiliateMarketing(){
    const route = useRoute();
    const affiliateCode = useCookie('affiliateCode');

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
