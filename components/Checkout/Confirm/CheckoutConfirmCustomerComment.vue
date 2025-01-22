<script setup lang="ts">
const { t } = useI18n();
</script>
<template>
  <CheckoutConfirmCard :title="t('checkout.confirm.orderComment.heading')">
      <FormKit 
        type="textarea"
        :label="t('checkout.confirm.orderComment.label')"
        name="customerComment"
      />
  </CheckoutConfirmCard>
</template>