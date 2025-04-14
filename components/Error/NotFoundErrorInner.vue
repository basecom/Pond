<script setup lang="ts">
import UIButton from "../ui/button/UIButton.vue";
</script>

<template>
  <slot name="container">
  <div class="container mt-12">
    <slot name="title"><h1 class="text-4xl text-center uppercase mb-4">{{ $t('error.404.heading') }}</h1></slot>
    <slot name="subTitle"><p class="text-center mb-4">{{ $t('error.404.detail') }}</p></slot>
    <slot name="button"><div class="text-center"><a href="/"><UIButton></UIButton></a></div></slot>
  </div>
  </slot>
</template>
