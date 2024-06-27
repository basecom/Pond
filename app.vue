<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from 'radix-vue';

const progressValue = ref(20);
setTimeout(() => {
    progressValue.value = 100;
}, 2000);
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />

        <h1 class="text-3xl font-semibold text-blue-600">Pond.</h1>

        <ProgressRoot
            v-model="progressValue"
            class="relative overflow-hidden bg-blue-600 rounded-full w-full sm:w-[300px] h-4 sm:h-5"
            style="transform: translateZ(0)"
        >
            <ProgressIndicator
                class="bg-blue-200 rounded-full w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                :style="`transform: translateX(-${100 - progressValue}%)`"
            />
        </ProgressRoot>
    </div>
</template>
