<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    address: Schemas['CustomerAddress'];
}>();
</script>

<template>
    <p>
        <span class="font-semibold"> {{ address.firstName }} {{ address.lastName }} </span><br />
        <template v-if="address.company"><span> {{ address.company }} </span><br /></template>
        <span> {{ address.street }} </span><br />
        <span> {{ address.zipcode }} {{ address.city }} </span><br />
        <span> {{ address.country.translated.name }} </span><br />
        <span v-if="address.phoneNumber">
            {{ address.phoneNumber }}
        </span>
    </p>
</template>
