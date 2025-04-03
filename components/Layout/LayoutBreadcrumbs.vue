<script setup lang="ts">
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

const { breadcrumbs } = useBreadcrumbs();
const route = useRoute();
const { t } = useI18n();
</script>

<template>
    <nav
        class="container mx-auto my-8 flex"
        :aria-label="$t('layout.breadcrumb.ariaLabel')"
    >
        <ol class="inline-flex flex-wrap items-center gap-2">
            <li
                v-if="displayRoot && route.fullPath !== '/'"
                class="inline-flex min-w-fit items-center gap-2"
            >
                <LocaleLink
                    :to="'/'"
                    class="inline-flex items-center gap-2 text-sm font-medium last:text-brand-primary hover:text-brand-primary"
                >
                    <FormKitIcon
                        v-if="rootIcon"
                        :icon="rootIcon"
                        class="size-2.5"
                        :title="rootIcon"
                    />
                    {{ $t('layout.breadcrumb.homeLinkLabel') }}
                </LocaleLink>

                <FormKitIcon
                    v-if="breadcrumbs?.length > 0"
                    class="block size-2.5"
                    icon="chevron-right"
                    :title="t('icon.rightArrow')"
                />
            </li>

            <li
                v-for="(breadcrumb, index) in breadcrumbs"
                :key="breadcrumb.path"
                class="inline-flex min-w-fit items-center gap-2"
            >
                <LocaleLink
                    v-if="breadcrumb.path"
                    :to="breadcrumb.path"
                    class="inline-flex items-center text-sm font-medium last:text-brand-primary hover:text-brand-primary"
                >
                    {{ breadcrumb.name }}
                </LocaleLink>

                <span
                    v-else
                    class="inline-flex items-center text-sm font-medium last:text-brand-primary hover:text-brand-primary"
                >
                    {{ breadcrumb.name }}
                </span>

                <FormKitIcon
                    v-if="index < breadcrumbs.length - 1"
                    class="block size-2.5"
                    icon="chevron-right"
                    :title="t('icon.rightArrow')"
                />
            </li>
        </ol>
    </nav>
</template>
