<script setup lang="ts">
withDefaults(
    defineProps<{
        value: number;
        label: string;
        highlight?: boolean;
    }>(),
    {
        highlight: false,
    },
);

const { getFormattedPrice } = usePrice();
</script>

<template>
    <div
        class="flex justify-between border-b border-gray py-4 text-sm last:border-none"
        :class="{
            'font-bold': highlight,
        }"
    >
        <p
            class="text-gray-dark"
            :class="{
                'text-black': highlight,
            }"
        >
            {{ label }}
        </p>
        <span>{{ getFormattedPrice(value) }}</span>
    </div>
</template>
