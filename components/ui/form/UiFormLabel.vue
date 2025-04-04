<script lang="ts" setup>
import type { LabelProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { useFormField } from './useFormField';

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>();

const { error, formItemId } = useFormField();
</script>

<template>
    <UiLabel
        :class="cn(
            error && 'text-red-500',
            props.class,
        )"
        :for="formItemId"
    >
        <slot />
    </UiLabel>
</template>
