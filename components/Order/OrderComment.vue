<script setup lang="ts">
const { t } = useI18n();

defineProps<{
      customerComment: string;
}>();

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