<script setup lang="ts">
import { getTranslatedProperty} from "@shopware-pwa/helpers-next";
import { useRuntimeConfig } from '#imports';
const { paymentMethods, getPaymentMethods } = useCheckout();
const runtimeConfig = useRuntimeConfig();

const filteredPaymentMethods = computed(() =>
    paymentMethods.value.filter(method => method.media?.path)
);

onMounted(async () => {
  await getPaymentMethods();
});
</script>

<template>
  <div class="flex justify-center py-2">
    <div class="flex flex-wrap justify-center gap-6">
      <div
          v-for="method in filteredPaymentMethods"
          :key="method.id"
          class="flex items-center justify-center"
      >
        <img
            v-if="method.media?.path"
            :src="`${runtimeConfig.public.pond.shopwareEndpoint}/${method.media.path}`"
            :alt="getTranslatedProperty(method, 'name')"
            :title="getTranslatedProperty(method, 'name')"
            class="max-h-8 max-w-24 object-contain"
            loading="eager"
        />
      </div>
    </div>
  </div>
</template>