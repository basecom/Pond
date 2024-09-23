<template>
    <div class="flex gap-3 py-4 md:w-1/5">
        <LanguageSwitch />
        <CookieBannerModal>
            <template #trigger>
                <button class="rounded-full bg-brand-primary p-2">
                    <FormKitIcon
                        class="block h-4 w-4 cursor-pointer text-white"
                        icon="cookie"
                    />
                </button>
            </template>
        </CookieBannerModal>
    </div>
</template>
