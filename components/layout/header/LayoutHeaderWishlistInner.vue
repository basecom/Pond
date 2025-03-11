<script setup lang="ts">
withDefaults(
    defineProps<{
      wishlistItems?: number;
    }>(),
    {
        wishlistItems: 0,
    },
);
</script>

<template>
    <slot name="wrapper">
        <NuxtLinkLocale
            to="/wishlist"
            class="relative h-5"
        >
            <slot name="wishlist-icon">
                <Icon name="mdi:cards-heart-outline" class="size-5" />
            </slot>

            <slot name="wishlist-badge">
                <UiBadge v-if="wishlistItems > 0" class="absolute -right-2 -top-1.5 px-1 py-0 text-xs font-normal">
                    {{ wishlistItems }}
                </UiBadge>
            </slot>
        </NuxtLinkLocale>
    </slot>
</template>
