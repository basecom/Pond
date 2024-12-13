<script setup lang="ts">
withDefaults(
    defineProps<{
        smallLogo?: boolean;
        logoClasses?: string;
        withLink?: boolean;
    }>(),
    {
        smallLogo: false,
        logoClasses: '',
        withLink: true,
    },
);

const configStore = useConfigStore();
const shopName = configStore.get('core.basicInformation.shopName') ?? 'pond';
</script>

<template>
    <NuxtLink
        :aria-label="shopName"
        :title="shopName"
        :to="withLink ? '/' : ''"
    >
        <span class="sr-only">{{ shopName }}</span>
        <img
            v-if="!smallLogo"
            src="/logo.svg"
            :alt="shopName"
            :class="logoClasses"
        />

        <img
            v-else
            src="/logo-small.svg"
            :alt="shopName"
            :class="logoClasses"
        />
    </NuxtLink>
</template>
