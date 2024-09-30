<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getProductRoute } from '@shopware-pwa/helpers-next';

defineProps<{
    product: Schemas['Product'];
}>();
</script>

<template>
    <NuxtLink
        :to="getProductRoute(product)"
        class="flex w-full justify-center rounded-md bg-gray px-4 py-2 text-sm text-white hover:bg-gray-dark"
    >
        {{ $t('product.goToDetail.label') }}
    </NuxtLink>
</template>
