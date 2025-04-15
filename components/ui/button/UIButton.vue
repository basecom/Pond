<script setup lang="ts">
import UIButtonInner from './UIButtonInner.vue';
withDefaults(
    defineProps<{
      buttonText?: string;
    }>(),
    {
        buttonText: '',
    },
);
</script>

<template>
    <UIButtonInner :button-text="buttonText" />
</template>
