<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ChangeMailForm } from '~/components/account/page/AccountPageProfileChangeMailInner.vue';

defineProps<{
  customer: Schemas['Customer'];
}>();

defineEmits<{
  'update-mail': [mailForm: ChangeMailForm];
}>();
</script>

<template>
    <AccountPageProfileChangeMailInner
        :customer="customer"
        @update-mail="(mailForm: ChangeMailForm) => $emit('update-mail', mailForm)"
    />
</template>
