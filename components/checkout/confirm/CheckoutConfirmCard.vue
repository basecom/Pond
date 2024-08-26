<script setup lang="ts">
defineProps<{
    title: string;
    subtitle?: string;
}>();
</script>

<template>
    <div class="grid gap-4 bg-white px-4 py-5 shadow sm:p-6">
        <div>
            <p class="font-bold" v-if="title">
                {{ title }}
            </p>

            <span
                v-if="subtitle"
                class="text-sm"
            >
                {{ subtitle }}
            </span>
        </div>

        <slot />
    </div>
</template>
