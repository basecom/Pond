<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
    <ErrorLayout>
        <!-- TODO: Once System Config is available -> check if CMS Layout is configured and display that instead of the fallback -->

        <FormKitIcon
            icon="magnifying-glass"
            :title="t('icon.magnifyingGlass')"
            class="block size-20 text-gray-dark"
        />

        <h1 class="pb-4 pt-6">
            {{ $t('error.404.heading') }}
        </h1>

        <p class="pb-8 text-center">
            {{ $t('error.404.detail') }}
        </p>

        <LocaleLink :to="'/'">
            <FormKit type="submit">
                {{ $t('global.homepageLinkLabel') }}
            </FormKit>
        </LocaleLink>
    </ErrorLayout>
</template>
