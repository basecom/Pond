<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
    error: NuxtError;
}>();
</script>

<template>
    <main class="container flex min-h-screen flex-col items-center justify-center p-8">
        <FormKitIcon
            icon="server"
            class="block h-20 w-20 text-gray-dark"
        />

        <h1 class="pb-4 pt-6">{{ $t('error.server.heading') }} - {{ error.statusCode }}</h1>

        <p class="pb-8 text-center">
            {{ $t('error.server.detail') }}
        </p>

        <LocaleLink :to="'/'">
            <FormKit type="submit">
                {{ $t('global.homepageLinkLabel') }}
            </FormKit>
        </LocaleLink>
    </main>
</template>
