<script setup lang="ts">
import type { ChangePasswordForm } from '~/components/account/page/AccountPageProfileChangePasswordInner.vue';

defineEmits<{
  'update-password': [passwordForm: ChangePasswordForm];
}>();
</script>

<template>
    <AccountPageProfileChangePasswordInner @update-password="(passwordForm: ChangePasswordForm) => $emit('update-password', passwordForm)" />
</template>
