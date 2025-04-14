<script setup lang="ts">
const { formatLink } = useInternationalization();
const route = useRoute();

const breadcrumbs = computed(() => route.path.split('/').filter((breadcrumb: string) => breadcrumb !== ''));
</script>

<template>
    <UiBreadcrumb class="mt-4 md:mt-6">
        <UiBreadcrumbList>
            <UiBreadcrumbItem>
                <UiBreadcrumbLink :href="formatLink('/')">
                    {{ $t('general.homepage') }}
                </UiBreadcrumbLink>
            </UiBreadcrumbItem>

            <template v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb">
                <UiBreadcrumbSeparator />

                <UiBreadcrumbItem>
                    <UiBreadcrumbPage v-if="index === breadcrumbs.length - 1">
                        {{ $t(`account.${breadcrumb}`) }}
                    </UiBreadcrumbPage>

                    <UiBreadcrumbLink v-else :href="formatLink(`/${breadcrumb}`)">
                        {{ $t(`account.${breadcrumb}`) }}
                    </UiBreadcrumbLink>
                </UiBreadcrumbItem>
            </template>
        </UiBreadcrumbList>
    </UiBreadcrumb>
</template>
