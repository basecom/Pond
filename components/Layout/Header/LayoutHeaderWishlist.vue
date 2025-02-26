<script setup lang="ts">
import { Badge } from '@/components/ui/badge';

const { count: wishlistCount } = useWishlist();
</script>

<template>
    <LocaleLink
        to="/wishlist"
        class="relative h-5"
    >
        <Icon name="mdi:cards-heart-outline" class="size-5" />
        <Badge v-if="wishlistCount > 0" class="absolute -right-2 -top-1.5 px-1 py-0 text-xs font-normal">
            {{ wishlistCount }}
        </Badge>
    </LocaleLink>
</template>
