import { useCmsBlock as useGlobalUseCmsBlock } from '@shopware-pwa/composables-next';
import type { Schemas } from '@shopware/api-client/api-types';

export const [useProvideCmsBlock, useCmsBlock] = createInjectionState(
    <BLOCK_TYPE extends Schemas['CmsBlock']>(content: BLOCK_TYPE) => {
        return useGlobalUseCmsBlock(content);
    },
);