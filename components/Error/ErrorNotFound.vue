<template>
    <ErrorLayout>
        <!-- TODO: Once System Config is available -> check if CMS Layout is configured and display that instead of the fallback -->

        <FormKitIcon
            icon="magnifying-glass"
            class="block h-20 w-20 text-gray-dark"
        />

        <!-- TODO: Snippets -->
        <h1 class="pb-4 pt-6">Page not found</h1>

        <p class="pb-8 text-center">The page you requested could not be found. Sorry!</p>

        <NuxtLink
            class="bg-brand-primary p-4 text-white hover:bg-brand-primary-dark"
            :to="'/'"
        >
            To the homepage
        </NuxtLink>
    </ErrorLayout>
</template>
