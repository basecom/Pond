<script setup lang="ts">
const { breadcrumbs } = useBreadcrumbs();

withDefaults(
    defineProps<{
        displayRoot?: boolean;
        rootIcon?: string;
    }>(),
    {
        displayRoot: true,
        rootIcon: '',
    },
);
</script>

<template>
    <nav
        class="container mx-auto my-8 hidden lg:flex"
        :aria-label="$t('layout.breadcrumb.ariaLabel')"
    >
        <ol class="inline-flex items-center gap-2">
            <li
                v-if="displayRoot"
                class="inline-flex items-center gap-2"
            >
                <FormattedLink
                    :to="'/'"
                    class="inline-flex items-center gap-2 text-sm font-medium last:text-brand-primary hover:text-brand-primary"
                >
                    <FormKitIcon
                        v-if="rootIcon"
                        :icon="rootIcon"
                        class="h-4 w-4"
                    />
                    {{ $t('layout.breadcrumb.homeLinkLabel') }}
                </FormattedLink>

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
                <FormattedLink
                    v-if="breadcrumb.path"
                    :to="breadcrumb.path"
                    class="inline-flex items-center text-sm font-medium last:text-brand-primary hover:text-brand-primary"
                >
                    {{ breadcrumb.name }}
                </FormattedLink>

                <span
                    v-else
                    class="inline-flex items-center text-sm font-medium last:text-brand-primary hover:text-brand-primary"
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
