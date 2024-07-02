<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from 'radix-vue';

const progressValue = ref(20);
setTimeout(() => {
    progressValue.value = 100;
}, 2000);

const { refreshSessionContext, sessionContext } = useSessionContext();
</script>

<template>
    <h2>okk</h2>
    <pre class="bg-gray-200 p-8">{{ sessionContext }}</pre>
    <button @click="refreshSessionContext">Refresh</button>
    <div>
        <NuxtRouteAnnouncer />

        <h1 class="text-3xl font-semibold text-blue-600">Pond.</h1>

        <ProgressRoot
            v-model="progressValue"
            class="relative h-4 w-full overflow-hidden rounded-full bg-blue-600 sm:h-5 sm:w-[300px]"
            style="transform: translateZ(0)"
        >
            <ProgressIndicator
                class="ease-[cubic-bezier(0.65, 0, 0.35, 1)] h-full w-full rounded-full bg-blue-200 transition-transform duration-[660ms]"
                :style="`transform: translateX(-${100 - progressValue}%)`"
            />
        </ProgressRoot>
    </div>
</template>
