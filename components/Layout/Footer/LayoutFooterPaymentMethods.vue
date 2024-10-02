<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { ref, onMounted } from 'vue';
import { useShopwareContext } from '#imports';
import { useRuntimeConfig } from '#imports';

const { apiClient } = useShopwareContext();
const runtimeConfig = useRuntimeConfig();

const paymentMethods = ref<Schemas['PaymentMethod'][]>([]);
const isLoading = ref(false);

const filteredPaymentMethods = computed(() =>
    paymentMethods.value.filter(method => method.media?.path)
);

const getImageUrl = (mediaPath: string): string => {
  if (mediaPath) {
    return `${runtimeConfig.public.pond.shopwareEndpoint}/${mediaPath}`;
  } else {
    return '/placeholder-image.png';
  }
};

const loadPaymentMethods = async () => {
  isLoading.value = true;
  try {
    const { data } = await apiClient.invoke('getPaymentMethods post /payment-method', {
      body: {},
    });
    if (data?.elements) {
      paymentMethods.value = data.elements;
    } else {
      paymentMethods.value = [];
    }
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    paymentMethods.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadPaymentMethods();
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
            :src="getImageUrl(method.media.path)"
            :alt="method.translated.name || 'Payment Method'"
            :title="method.translated.name || 'Payment Method'"
            class="max-h-8 max-w-24 object-contain"
            loading="eager"
        />
      </div>
    </div>
    <p v-if="isLoading" class="text-center w-full mt-4">Loading payment methods...</p>
    <p v-if="!isLoading && paymentMethods.length === 0" class="text-center w-full mt-4">No payment methods available.</p>
  </div>
</template>
