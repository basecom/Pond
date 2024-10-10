<script setup lang="ts">
/**
 * example usage:
 * this will generate a large badge in warning color
 * <UtilityBadge content="example" style="warning" size="lg" />
 *
 * this will result in a medium badge in info color with an icon in front of the content
 * <UtilityBadge content="example">
 *     <template #prefix>
 *          <FormKitIcon icon="heart" class="w-2 h-2 block" />
 *     </template>
 * </UtilityBadge>
 **/
withDefaults(
    defineProps<{
        content?: number | string | null;
        style?: 'info' | 'warning' | 'danger' | 'success';
        size?: 'sm' | 'md' | 'lg';
    }>(),
    {
        content: null,
        style: 'info',
        size: 'md',
    },
);
</script>

<template>
    <div
        v-if="content"
        class="flex w-fit flex-row items-center justify-center gap-2 rounded-full font-light text-white outline outline-1 outline-white"
        :class="{
            'bg-status-info': style === 'info',
            'bg-status-warning': style === 'warning',
            'bg-status-danger': style === 'danger',
            'bg-status-success': style === 'success',
            'px-1.5 py-0.5 text-xs': size === 'sm',
            'px-4 py-1 text-base': size === 'md',
            'text-md px-6 py-2': size === 'lg',
        }"
    >
        <slot name="prefix" />
        <span>
            {{ content }}
        </span>
        <slot name="suffix" />
    </div>
</template>
