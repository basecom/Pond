<template>
    <ErrorLayout>
        <template #content>
            <!-- TODO: Once System Config is available -> check if CMS Layout is configured and display that instead of the fallback -->

            <!-- TODO: Check  why this is necessary -> directly loading the icon destroys the rendering -->
            <ErrorIcon :icon="'magnifying-glass'" />

            <!-- TODO: Snippets -->
            <h1 class="pt-6 pb-4">
                Page not found
            </h1>

            <p class="pb-8 text-center">
                The page you requested could not be found. Sorry!
            </p>

            <NuxtLink
                class="bg-brand-primary p-4 text-white hover:bg-brand-primary-dark"
                :to="'/'"
            >
                To the homepage
            </NuxtLink>
        </template>
    </ErrorLayout>
</template>