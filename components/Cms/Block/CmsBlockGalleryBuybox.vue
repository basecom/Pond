<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getProductRoute } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const leftContent = getSlotContent('left') as Schemas['CmsSlot'];
const rightContent = getSlotContent('right') as Schemas['CmsSlot'];

const product = inject('product') as Ref<Schemas['Product']>;

// change the canonical tag if the option is enabled to use the same canonical for all variants
if (product.value.canonicalProductId && (product.value.canonicalProductId !== product.value.id)) {
    const url = useRequestURL();

    useHead(() => ({
        link: [
            {
                rel: 'canonical',
                href: url.origin + getProductRoute(product.value.canonicalProduct).path,
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
