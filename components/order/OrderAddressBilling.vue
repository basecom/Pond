<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    billingAddress: Schemas['OrderAddress'];
}>();
</script>

<template>
    <div>
        {{ billingAddress?.firstName }} {{ billingAddress?.lastName }}
    </div>

    <div>
        {{ billingAddress?.street }}
    </div>

    <div>
        {{ billingAddress?.zipcode }} {{ billingAddress?.city }}
    </div>
</template>