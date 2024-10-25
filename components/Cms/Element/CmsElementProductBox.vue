<script setup lang="ts">
import type { CmsElementProductBox } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementProductBox;
}>();

const { product } = useProduct(props.element.data.product);
</script>

<template>
    <ProductCard :product="product" />
</template>
