<template>
    <main class="container flex flex-col items-center justify-center min-h-screen p-8">
        <!-- TODO: Once System Config is available -> check if CMS Layout is configured and display that instead of the fallback -->

        <FormKitIcon
            icon="screwdriver-wrench"
            class="block h-20 w-20 text-gray-dark"
        />

        <!-- TODO: Snippets -->
        <h1 class="pt-6 pb-4">
            Maintenance mode
        </h1>

        <p class="pb-8 text-center">
            We apologize for the inconvenience but *Demostore* is currently undergoing planned maintenance.
            <br>
            Please check back in a couple of minutes!
        </p>

        <button class="bg-brand-primary text-white p-4 cursor-pointer" @click="reloadNuxtApp()">
            Check for updates
        </button>
    </main>
</template>