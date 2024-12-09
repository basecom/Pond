<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
    error: NuxtError;
}>();
</script>

<template>
    <ErrorLayout>
        <FormKitIcon
            icon="question"
            class="block h-20 w-20 text-gray-dark"
        />

        <h1 class="pb-4 pt-6">{{ $t('error.unknown.heading') }} - {{ error.statusCode }}</h1>

        <p class="pb-8 text-center">
            {{ $t('error.unknown.detail') }}
        </p>

        <FormattedLink
            class="bg-brand-primary p-4 text-white hover:bg-brand-primary-dark"
            :to="'/'"
        >
            {{ $t('global.homepageLinkLabel') }}
        </FormattedLink>
    </ErrorLayout>
</template>
