<template>
    <main class="container flex min-h-screen flex-col items-center justify-center p-8">
        <!-- TODO: Once System Config is available -> check if CMS Layout is configured and display that instead of the fallback -->

        <FormKitIcon
            icon="screwdriver-wrench"
            class="block size-20 text-gray-dark"
        />

        <h1 class="pb-4 pt-6">
            {{ $t('error.maintenance.heading') }}
        </h1>

        <p class="pb-8 text-center">
            {{ $t('error.maintenance.detail') }}
            <br />
            {{ $t('error.maintenance.tryAgain') }}
        </p>

        <FormKit
            type="submit"
            @click="reloadNuxtApp()"
        >
            {{ $t('error.maintenance.refresh') }}
        </FormKit>
    </main>
</template>
