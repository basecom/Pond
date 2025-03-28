<script setup lang="ts">
/**
 * example usage:
 * this will generate a large badge in warning color
 * <UtilityBadge content="example" type="warning" size="lg" />
 *
 * this will result in a medium badge in info color with an icon in front of the content
 * <UtilityBadge content="example" prefix-icon="heart" />
 **/
withDefaults(
    defineProps<{
      content?: number | string | null;
      type?: 'info' | 'warning' | 'danger' | 'success' | 'primary' | 'secondary' | 'gray';
      size?: 'sm' | 'md' | 'lg';
      prefixIcon?: string | null;
      suffixIcon?: string | null;
    }>(),
    {
        content: null,
        type: 'info',
        size: 'md',
        prefixIcon: null,
        suffixIcon: null,
    },
);
</script>

<template>
    <div
        v-if="content"
        class="flex w-fit flex-row items-center justify-center gap-2 rounded-full font-light text-white"
        :class="{
            'bg-status-info': type === 'info',
            'bg-status-warning': type === 'warning',
            'bg-status-danger': type === 'danger',
            'bg-status-success': type === 'success',
            'px-1.5 py-0.5 text-xs': size === 'sm',
            'px-4 py-1 text-base': size === 'md',
            'text-md px-6 py-2': size === 'lg',
        }"
    >
        <FormKitIcon
            v-if="prefixIcon"
            :icon="prefixIcon"
            :title="prefixIcon"
            class="block"
            :class="{
                'size-2.5': size === 'sm',
                'size-4': size === 'md' || size === 'lg',
            }"
        />
        <span>
            {{ content }}
        </span>
        <FormKitIcon
            v-if="suffixIcon"
            :icon="suffixIcon"
            :title="suffixIcon"
            class="block"
            :class="{
                'size-2.5': size === 'sm',
                'size-4': size === 'md' || size === 'lg',
            }"
        />
    </div>
</template>
