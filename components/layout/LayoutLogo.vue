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
    <LayoutLogoInner
        :shop-name="shopName"
        :logo-classes="logoClasses"
        :with-link="withLink"
    />
</template>
