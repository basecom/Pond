<script setup lang="ts">
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
    <slot name="button">
        <button class="border-2 border-solid border-transparent bg-brand-primary px-8 py-2 text-white">
            <slot name="buttonText">{{ buttonText }}</slot>
        </button>
    </slot>
</template>
