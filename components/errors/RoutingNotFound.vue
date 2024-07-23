<template>
    <div class="my-20 text-center">
        <h1 class="mb-3 text-2xl font-bold">page could not be found</h1>
        <NuxtLink
            class="inline-flex items-center justify-center bg-brand-primary px-4 py-2 text-center text-white hover:bg-brand-primary-dark"
            :to="{ name: 'index' }"
        >
            Homepage
        </NuxtLink>
    </div>
</template>
