<script setup lang="ts">
import UIButton from '../ui/button/UIButton.vue';
</script>

<template>
    <slot name="container">
        <div class="container mt-12">
            <slot name="title"><h1 class="mb-4 text-center text-4xl uppercase">{{ $t('error.404.heading') }}</h1></slot>
            <slot name="subTitle"><p class="mb-4 text-center">{{ $t('error.404.detail') }}</p></slot>
            <slot name="button"><div class="text-center"><a href="/"><UIButton :button-text="$t('error.404.button')" /></a></div></slot>
        </div>
    </slot>
</template>
