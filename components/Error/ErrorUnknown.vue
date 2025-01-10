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

        <LocaleLink
            :to="'/'"
        >
            <FormKit type="submit">
                {{ $t('global.homepageLinkLabel') }}
            </FormKit>
        </LocaleLink>
    </ErrorLayout>
</template>
