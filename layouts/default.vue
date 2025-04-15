<template>
    <NuxtLoadingIndicator class="!bg-brand-primary !bg-none" />
    <NuxtRouteAnnouncer />

    <ClientOnly>
        <UiToaster />
    </ClientOnly>

    <LayoutHeader />

    <main>
        <NuxtPage />
    </main>
</template>
