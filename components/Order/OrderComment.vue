<script setup lang="ts">
defineProps<{
  customerComment: string;
}>();

const { t } = useI18n();
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