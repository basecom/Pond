<script setup lang="ts">
import UiButton from '../ui/button/UiButton.vue';
</script>

<template>
    <slot name="container">
        <div class="container mt-12">
            <slot name="title"><h1 class="mb-4 text-center text-4xl uppercase">{{ $t('error.404.heading') }}</h1></slot>
            <slot name="subTitle"><p class="mb-4 text-center">{{ $t('error.404.detail') }}</p></slot>
            <slot name="button">
                <div class="text-center">
                  <NuxtLinkLocale to="/"><UiButton variant="link">{{ $t('error.404.button') }}</UiButton></NuxtLinkLocale>
                </div>
            </slot>
        </div>
    </slot>
</template>
