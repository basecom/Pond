<script setup lang="ts">
withDefaults(
    defineProps<{
      logoClasses?: { [key: string]: boolean };
      withLink?: boolean;
    }>(),
    {
        logoClasses: undefined,
        withLink: true,
    },
);

const configStore = useConfigStore();
const shopName = configStore.get('core.basicInformation.shopName') as string|null ?? 'pond';
</script>

<template>
    <LocaleLink
        :aria-label="shopName"
        :title="shopName"
        :to="withLink ? '/' : ''"
    >
        <span class="sr-only">
            {{ shopName }}
        </span>

        <img
            src="/logo.svg"
            :alt="shopName"
            :title="shopName"
            :class="logoClasses"
        >
    </LocaleLink>
</template>
