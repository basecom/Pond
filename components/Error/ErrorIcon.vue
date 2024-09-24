<script setup lang="ts">
const props = defineProps<{
    icon: string;
}>();
</script>

<template>
    <FormKitIcon
        :icon="props.icon"
        class="block h-20 w-20 text-gray-dark"
    />
</template>