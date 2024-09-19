<script setup lang="ts">
const props = defineProps<{
    title: string;
    method: { name: string } | null | undefined;
    state: { name: string } | null | undefined;
}>();
</script>

<template>
    <div class="flex">
        <div>
            <div v-if="method?.name" class="font-bold mt-5">{{ title }}</div>
            <div v-if="method?.name">{{ method.name }}</div>
        </div>
        <div>
            <div v-if="state?.name" class="font-bold mt-5">{{ title }} Status</div>
            <div v-if="state?.name">{{ state.name }}</div>
        </div>
    </div>
</template>
