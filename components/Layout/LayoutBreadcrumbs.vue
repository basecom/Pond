<script setup lang="ts">
const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
    <nav
        class="container mx-auto my-8 hidden lg:flex"
        aria-label="Breadcrumb"
    >
        <ol class="inline-flex items-center gap-2">
            <li class="inline-flex items-center gap-2">
                <NuxtLink
                    :to="'/'"
                    class="inline-flex items-center text-sm font-medium"
                >
                    Home
                </NuxtLink>

                <FormKitIcon
                    v-if="breadcrumbs?.length > 0"
                    class="block h-4 w-4"
                    icon="chevron-right"
                />
            </li>

            <li
                v-for="(breadcrumb, index) in breadcrumbs"
                :key="breadcrumb.path"
                class="inline-flex items-center gap-2"
            >
                <NuxtLink
                    v-if="breadcrumb.path"
                    :to="breadcrumb.path"
                    class="inline-flex items-center text-sm font-medium last:text-brand-primary"
                >
                    {{ breadcrumb.name }}
                </NuxtLink>

                <span
                    v-else
                    class="inline-flex items-center text-sm font-medium last:text-brand-primary"
                >
                    {{ breadcrumb.name }}
                </span>

                <FormKitIcon
                    v-if="index < breadcrumbs.length - 1"
                    class="block h-4 w-4"
                    icon="chevron-right"
                />
            </li>
        </ol>
    </nav>
</template>
