<script setup lang="ts">
import UIButton from "../../pond/components/ui/button/UIButton.vue";
</script>

<template>
  <div class="container mt-12">
    <h1 class="text-4xl text-center uppercase mb-4">{{ $t('error.404.heading') }}</h1>
    <p class="text-center mb-4">{{ $t('error.404.detail') }}</p>
    <div class="text-center"><a href="/"><UIButton></UIButton></a></div>
  </div>
</template>
