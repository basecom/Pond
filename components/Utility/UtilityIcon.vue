<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        icon: string;
        class?: string | null;
        useStrokeColor?: boolean;
    }>(),
    {
        class: 'w-4',
        useStrokeColor: false,
    },
);

/* eslint-disable @typescript-eslint/no-explicit-any */
const iconRef = ref<string | Record<string, any>>('');

async function getIcon() {
    try {
        const iconsImport = import.meta.glob('assets/icons/**/**.svg', {
            as: 'raw',
            eager: false,
        });
        iconRef.value = await iconsImport[`/assets/icons/${props.icon}.svg`]();
    } catch {
        console.error(`Icon '${props.icon}' doesn't exist in 'assets/icons'`);
    }
}

await getIcon();

watchEffect(getIcon);

const customClasses = computed(() => {
    if (props.class) {
        return `${props.class} ${props.useStrokeColor ? 'stroke-icon' : ''}`;
    }

    if (props.useStrokeColor) {
        return 'stroke-icon';
    }

    return '';
});
</script>

<template>
    <!-- eslint-disable vue/no-v-html -->
    <span class="layout-icon fill-current block" :class="customClasses" v-html="iconRef" />
</template>

<style>
/* full-current from tailwind only works on svg tags directly which we don't use directly above */
.layout-icon {
    fill: currentColor;
}
.layout-icon svg {
    width: 100%;
    height: 100%;
    vertical-align: middle;
}

.stroke-icon.layout-icon path {
    stroke: currentColor;
}
</style>
