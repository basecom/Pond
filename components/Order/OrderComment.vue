<script setup lang="ts">
const { t } = useI18n();

withDefaults(
  defineProps<{
    customerComment: string;
  }>(), {
    customerComment: t('order.commentDefaultValue'),
  }
);
</script>

<template>
    <FormKit 
      type="textarea"
      disabled
      :value="customerComment"
      :label="t('checkout.finish.customerCommentLabel')"
      name="customerComment"
    />
</template>