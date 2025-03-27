export function useAffiliateMarketing(){
    const route = useRoute();
    const affiliateCode = useCookie('affiliateCode');

    const setAffiliateCode = async (queryParamKey: string) => {
        const queryParamValue = route.query[queryParamKey];

        if (Array.isArray(queryParamValue)) {
            affiliateCode.value = queryParamValue[0];
        } else {
            affiliateCode.value = queryParamValue;
        }
    };

    return {
        affiliateCode,
        setAffiliateCode,
    };
}
