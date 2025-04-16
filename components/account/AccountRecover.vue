<script setup lang="ts">
import type { RecoverData } from './AccountRecoverInner.vue';

const isLoading = ref(false);
const showSuccessMessage = ref(false);

const customerStore = useCustomerStore();
const { getStorefrontUrl } = useInternationalization();

const recover = async (recoverData: RecoverData) => {
    isLoading.value = true;

    try {
        await customerStore.resetPassword({
            ...recoverData,
            storefrontUrl: getStorefrontUrl(),
        });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // catch but do nothing
    } finally {
        showSuccessMessage.value = true;
        isLoading.value = false;
    }
};
</script>

<template>
    <AccountRecoverInner
        :is-loading="isLoading"
        :show-success-message="showSuccessMessage"
        @recover="(recoverData: RecoverData) => recover(recoverData)"
    />
</template>
