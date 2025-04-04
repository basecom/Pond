export const useLocale = () => {
    const { locale, defaultLocale } = useI18n();

    const getLocalePathPrefix = (givenLocale?: string) => {
        const workingLocale = givenLocale ?? locale.value;
        if (workingLocale === defaultLocale) {
            return '';
        }
        return `/${workingLocale}`;

    };

    return {
        getLocalePathPrefix,
    };
};
