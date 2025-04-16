<script setup lang="ts">
const cookieBannerStore = useCookieBannerStore();
const { isAcceptAllEnabled } = storeToRefs(cookieBannerStore);
</script>

<template>
    <div class="flex flex-wrap justify-center gap-2">
        <FormKit
            type="button"
            :classes="{
                input: 'max-w-fit',
            }"
            @click="cookieBannerStore.denyAll()"
        >
            {{ $t('cookie.banner.denyAllButton') }}
        </FormKit>

        <CookieBannerModal>
            <template #trigger>
                <FormKit
                    type="button"
                    :classes="{
                        input: 'max-w-fit',
                    }"
                >
                    {{ $t('cookie.banner.configureButton') }}
                </FormKit>
            </template>
        </CookieBannerModal>

        <FormKit
            v-if="isAcceptAllEnabled"
            type="submit"
            :classes="{
                input: 'max-w-fit',
            }"
            @click="cookieBannerStore.acceptAll()"
        >
            {{ $t('cookie.banner.allowAllButton') }}
        </FormKit>
    </div>
</template>
