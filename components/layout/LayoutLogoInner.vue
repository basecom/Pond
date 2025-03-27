<script setup lang="ts">
withDefaults(
    defineProps<{
      shopName: string;
      logoClasses?: { [key: string]: boolean };
      withLink?: boolean;
    }>(),
    {
        logoClasses: undefined,
        withLink: true,
    },
);
</script>

<template>
    <template v-if="withLink">
        <slot name="logo-link">
            <NuxtLinkLocale to="/">
                <slot name="logo-image">
                    <img
                        src="/logo.svg"
                        :alt="shopName"
                        :title="shopName"
                        :class="logoClasses"
                    >
                </slot>
            </NuxtLinkLocale>
        </slot>
    </template>

    <template v-else>
        <slot name="logo-image">
            <img
                src="/logo.svg"
                :alt="shopName"
                :title="shopName"
                :class="logoClasses"
            >
        </slot>
    </template>
</template>
