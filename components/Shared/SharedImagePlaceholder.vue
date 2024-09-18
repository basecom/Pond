<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        size?: 'xs' | 'sm' | 'md' | 'lg';
    }>(),
    {
        size: 'md',
    },
);

const sizeMap: Record<string, number> = {
    xs: 8,
    sm: 16,
    md: 32,
    lg: 64,
};

const imageSize = computed(() => sizeMap[props.size]);
</script>

<template>
    <div class="w-full h-full aspect-square flex items-center">
        <FormKitIcon icon="image"
                     class="block mx-auto text-gray-dark"
                     :class="`h-${imageSize} w-${imageSize}`"
        />
    </div>
</template>