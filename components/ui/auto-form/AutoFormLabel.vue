<script setup lang="ts">
defineProps<{
  required?: boolean
}>();
</script>

<template>
    <UiFormLabel>
        <slot />
        <span v-if="required" class="text-red-500"> *</span>
    </UiFormLabel>
</template>
