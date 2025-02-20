<script setup lang="ts">
withDefaults(
    defineProps<{
      title: string;
      method?: { name: string } | null | undefined;
      state?: { name: string } | null | undefined;
    }>(),
    {
        method: null,
        state: null,
    },
);
</script>

<template>
    <div class="flex">
        <div>
            <div
                v-if="method?.name"
                class="mt-5 font-bold"
            >
                {{ title }}
            </div>
            <div v-if="method?.name">{{ method.name }}</div>
        </div>
        <div>
            <div
                v-if="state?.name"
                class="mt-5 font-bold"
            >
                {{ title }} {{ $t('account.orders.status') }}
            </div>
            <div v-if="state?.name">{{ state.name }}</div>
        </div>
    </div>
</template>
