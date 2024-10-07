<script setup lang="ts">
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

const { paymentMethods, getPaymentMethods } = useCheckout();
const filteredPaymentMethods = computed(() => paymentMethods.value.filter(method => method.media?.path));

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
                    v-if="method.media?.url"
                    :src="method.media.url"
                    :alt="getTranslatedProperty(method, 'name')"
                    :title="getTranslatedProperty(method, 'name')"
                    class="h-8 w-auto object-contain"
                    loading="eager"
                />
            </div>
        </div>
    </div>
</template>
