<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

defineProps<{
    address: Schemas['CustomerAddress'] | Schemas['OrderAddress'];
}>();
</script>

<template>
    <div>
        <p class="font-semibold">{{ address.firstName }} {{ address.lastName }}</p>
        <p v-if="address.company">
            {{ address.company }}
        </p>
        <p>{{ address.street }}</p>
        <p>{{ address.zipcode }} {{ address.city }}</p>
        <p v-if="address.country">
            {{ getTranslatedProperty(address.country, 'name') }}
        </p>
        <p v-if="address.phoneNumber">
            {{ address.phoneNumber }}
        </p>
    </div>
</template>
