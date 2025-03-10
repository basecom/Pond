<script setup lang="ts">
import type { FieldProps } from './interface';
import { FormField } from '@/components/ui/form';
import AutoFormLabel from './AutoFormLabel.vue';
import { beautifyObjectName } from './utils';

defineOptions({
    inheritAttrs: false,
});

defineProps<FieldProps>();
</script>

<template>
    <FormField v-slot="slotProps" :name="fieldName">
        <UiFormItem>
            <AutoFormLabel v-if="!config?.hideLabel" :required="required">
                {{ config?.label || beautifyObjectName(label ?? fieldName) }}
            </AutoFormLabel>
            <UiFormControl>
                <slot v-bind="slotProps">
                    <Input type="number" v-bind="{ ...slotProps.componentField, ...config?.inputProps }" :disabled="config?.inputProps?.disabled ?? disabled" />
                </slot>
            </UiFormControl>
            <UiFormDescription v-if="config?.description">
                {{ config.description }}
            </UiFormDescription>
            <UiFormMessage />
        </UiFormItem>
    </FormField>
</template>
