<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    paymentMethod: Schemas['PaymentMethod'];
}>();
</script>

<template>
    <div>
        {{ paymentMethod?.translated.name }}
    </div>
</template>