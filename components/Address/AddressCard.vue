<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    address: Schemas["CustomerAddress"];
}>();

defineEmits<{
    'edit': [address: Schemas["CustomerAddress"]],
    'delete': [address: Schemas["CustomerAddress"]['id']],
}>()
</script>

<template>
    <div class="rounded-lg bg-white p-4 shadow">
        <p class="font-semibold">{{ address.firstName }} {{ address.lastName }}</p>
        <p v-if="address.company">{{ address.company }}</p>
        <p>{{ address.street }}</p>
        <p>{{ address.zipcode }} {{ address.city }}</p>
        <p>{{ address.country.translated.name }}</p>
        <p v-if="address.phoneNumber">{{ address.phoneNumber }}</p>

        <div class="mt-2">
            <button
                class="rounded bg-brand-primary px-2 py-1 text-white"
                @click="() => $emit('edit', address)"
            >
                {{ $t('account.address.edit') }}
            </button>
            <button
                class="ml-2 rounded bg-status-danger px-2 py-1 text-white"
                @click="() => $emit('delete', address.id)"
            >
                {{ $t('account.address.delete') }}
            </button>
        </div>
    </div>
</template>