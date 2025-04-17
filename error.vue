<script setup lang="ts">
import type { NuxtError } from '#app';
import NotFoundError from './components/error/NotFoundError.vue';

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

const pageNotFound = computed(() => props.error?.statusCode === 404);
</script>

<template>
    <NuxtLoadingIndicator />
    <LayoutHeader />
    <main class="container">
        <template v-if="pageNotFound">
            <NotFoundError />
        </template>

        <template v-else>
            <div class="container mt-12">
                <h1 class="mb-4 text-center text-4xl uppercase">{{ error?.statusCode }}</h1>
                <p class="mb-4 text-center">{{ error?.message }}</p>
            </div>
        </template>
    </main>
</template>
