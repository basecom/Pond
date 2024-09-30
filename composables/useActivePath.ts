import { useRoute } from 'vue-router';
import type { Schemas } from '@shopware/api-client/api-types';

export const useActivePath = () => {
    const isActive = (path: Schemas['SeoUrl'][] | undefined, onlyExactMatch: boolean = false) => {
        if (!path) return false;

        const formattedPath = '/' + path[0]?.seoPathInfo;
        const { path: currentPath } = useRoute();

        return onlyExactMatch ? formattedPath === currentPath : currentPath.includes(formattedPath);
    };

    return { isActive };
};
