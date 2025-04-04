<script setup lang="ts">
import type { FieldProps } from './interface';
import { FormField } from '@/components/ui/form';
import { beautifyObjectName } from './utils';

defineOptions({
    inheritAttrs: false,
});

defineProps<FieldProps>();
</script>

<template>
    <FormField v-slot="slotProps" :name="fieldName">
        <UiFormItem>
            <UiAutoFormLabel v-if="!config?.hideLabel" :required="required">
                {{ config?.label || beautifyObjectName(label ?? fieldName) }}
            </UiAutoFormLabel>
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
