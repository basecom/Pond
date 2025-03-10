import { useContext } from '#imports';
import type { Schemas } from '@shopware/api-client/api-types';

export const useContextStore = defineStore('context-store', () => {
    const { refreshSessionContext: _refreshSessionContext, sessionContext } = useSessionContext();
    const { languages, getAvailableLanguages } = useInternationalization();

    const _sessionContext = useContext('swSessionContext');
    const _context = useState<Schemas['SalesChannelContext'] | null>(() => null);
    const _languages = useState<Schemas['Language'][]>(() => []);
    const loading = ref(true);

    const refreshSessionContext = async () => {
        loading.value = true;
        await _refreshSessionContext();
        _context.value = sessionContext.value;
        loading.value = false;
    };

    const reloadSessionContextFromSsr = () => {
        if (_context.value) {
            _sessionContext.value = _context.value;
        }
    };

    const startLoading = () => {
        loading.value = true;
    };

    const stopLoading = () => {
        loading.value = false;
    };

    const getAllLanguages = async () => {
        await getAvailableLanguages();
        _languages.value = languages.value;
    };

    const reloadLanguagesFromSsr = () => {
        languages.value = _languages.value;
    };

    return {
        loading,
        refreshSessionContext,
        startLoading,
        stopLoading,
        reloadSessionContextFromSsr,
        reloadLanguagesFromSsr,
        getAllLanguages,
    };
});
