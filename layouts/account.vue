<script setup lang="ts">
await usePondAuthentication().rerouteIfLoggedOut();
</script>

<template>
    <NuxtLoadingIndicator class="!bg-brand-primary !bg-none" />
    <NuxtRouteAnnouncer />

    <ClientOnly>
        <UiToaster />
    </ClientOnly>

    <LayoutHeader />

    <main class="container">
        <AccountBreadcrumb />

        <div class="md:mt-6 md:grid md:grid-cols-[3fr_9fr] md:gap-8">
            <AccountMenu />

            <div>
                <NuxtPage />
            </div>
        </div>
    </main>
</template>
