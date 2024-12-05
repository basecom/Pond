<template>
    <ErrorLayout>
        <!-- TODO: Once System Config is available -> check if CMS Layout is configured and display that instead of the fallback -->

        <FormKitIcon
            icon="magnifying-glass"
            class="block h-20 w-20 text-gray-dark"
        />

        <h1 class="pb-4 pt-6">
            {{ $t('error.404.heading') }}
        </h1>

        <p class="pb-8 text-center">
            {{ $t('error.404.detail') }}
        </p>

        <FormattedLink
            class="bg-brand-primary p-4 text-white hover:bg-brand-primary-dark"
            :to="'/'"
        >
            {{ $t('global.homepageLinkLabel') }}
        </FormattedLink>
    </ErrorLayout>
</template>
