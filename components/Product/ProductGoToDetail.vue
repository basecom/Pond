<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getProductRoute } from '@shopware-pwa/helpers-next';

defineProps<{
    product: Schemas['Product'];
}>();
</script>

<template>
    <LocaleLink
        :to="getProductRoute(product)"
    >
        <FormKit type="submit"
            :classes="{
                input: 'bg-gray hover:bg-gray-dark border-none'
            }"
        >
            {{ $t('product.goToDetail.label') }}
        </FormKit>
    </LocaleLink>
</template>
