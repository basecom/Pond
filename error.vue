<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
    // we don't need a default value -> it's always set
    // eslint-disable-next-line vue/require-default-prop
    error: Object as () => NuxtError,
});

const { locale } = useI18n();
const url = useRequestURL();
const route = useRoute();
const configStore = useConfigStore();
await configStore.loadConfig();
const shopName = configStore.get('core.basicInformation.shopName') as string|null ?? 'pond';

useHead(() => ({
    title: `${shopName  } - ${ props.error?.statusCode}`,
    htmlAttrs: {
        lang: locale.value,
    },
    link: [
        {
            rel: 'canonical',
            href: url.origin + route.path,
        },
    ],
}));
</script>

<template>
    <NuxtLoadingIndicator />
    <LayoutHeader />

    <main class="container">
        <h1>{{ error?.statusCode }}</h1>
        <p>{{ error?.message }}</p>
    </main>
</template>
