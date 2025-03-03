<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        size?: 'xs' | 'sm' | 'md' | 'lg';
    }>(),
    {
        size: 'md',
    },
);

const emit = defineEmits(['load-icon']);

const sizeMap: Record<string, number> = {
    xs: 8,
    sm: 16,
    md: 36,
    lg: 64,
};

const imageSize = computed(() => sizeMap[props.size]);

onMounted(() => {
    emit('load-icon');
});
</script>

<template>
    <div class="flex aspect-square size-full items-center">
        <FormKitIcon
            icon="image"
            class="mx-auto block text-gray-dark"
            :class="`h-${imageSize} w-${imageSize}`"
        />
    </div>
</template>
