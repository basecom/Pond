<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const leftContent: Schemas['CmsSlot'] = getSlotContent('left');
const rightContent: Schemas['CmsSlot'] = getSlotContent('right');

// get product from slots - default: right slot
// fallback to left slot in case the elements were switched in the layout
const product = rightContent.data?.product ?? leftContent.data?.product;

// change the canonical tag if the option is enabled to use the same canonical for all variants
if (product.canonicalProductId && product.canonicalProductId !== product.id) {
    const runtimeConfig = useRuntimeConfig();
    const { getProductRouteById } = useProductRoute();
    const canonicalUrl = await getProductRouteById(product.canonicalProductId);

    useHead(() => ({
        link: [
            {
                rel: 'canonical',
                href: runtimeConfig.public.pond.shopwareEndpoint + canonicalUrl.path,
            },
        ],
    }))
}
</script>

<template>
    <div class="grid grid-cols-5 gap-4">
        <CmsLoader
            :content="leftContent"
            class="col-span-5 sm:col-span-3"
        />

        <CmsLoader
            :content="rightContent"
            class="col-span-5 sm:col-span-2"
        />
    </div>
</template>
