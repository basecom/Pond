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

// pond-todo: waiting for plugin config -> use the config then
const shopName = 'pond';
</script>

<template>
    <FormattedLink
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
    </FormattedLink>
</template>
