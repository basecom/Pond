<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const leftContent = getSlotContent('left') as Schemas['CmsSlot'];
const rightContent = getSlotContent('right') as Schemas['CmsSlot'];

const product = inject('productData') as Ref<Schemas['Product']>;

// change the canonical tag if the option is enabled to use the same canonical for all variants
if (product.value.canonicalProductId && product.value.canonicalProductId !== product.value.id) {
    const runtimeConfig = useRuntimeConfig();
    const { getUrlByProductId } = useSeoUrl();
    const canonicalUrl = await getUrlByProductId(product.value.canonicalProductId);

    useHead(() => ({
        link: [
            {
                rel: 'canonical',
                href: runtimeConfig.public.pond.shopwareEndpoint + canonicalUrl.path,
            },
        ],
    }));
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
