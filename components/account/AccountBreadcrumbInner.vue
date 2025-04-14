<script setup lang="ts">
const { formatLink } = useInternationalization();
const route = useRoute();

const breadcrumbs = computed(() => route.path.split('/').filter((breadcrumb: string) => breadcrumb !== ''));
</script>

<template>
    <UiBreadcrumb class="mt-4 md:mt-6">
        <UiBreadcrumbList>
            <UiBreadcrumbItem>
                <slot name="breadcrumb-home">
                    <UiBreadcrumbLink :href="formatLink('/')">
                        {{ $t('general.homepage') }}
                    </UiBreadcrumbLink>
                </slot>
            </UiBreadcrumbItem>

            <slot name="breadcrumb-items">
                <template v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb">
                    <UiBreadcrumbSeparator />

                    <slot name="breadcrumb-item">
                        <UiBreadcrumbItem>
                            <UiBreadcrumbPage v-if="index === breadcrumbs.length - 1">
                                {{ $t(`account.${breadcrumb}`) }}
                            </UiBreadcrumbPage>

                            <UiBreadcrumbLink v-else :href="formatLink(`/${breadcrumb}`)">
                                {{ $t(`account.${breadcrumb}`) }}
                            </UiBreadcrumbLink>
                        </UiBreadcrumbItem>
                    </slot>
                </template>
            </slot>
        </UiBreadcrumbList>
    </UiBreadcrumb>
</template>
