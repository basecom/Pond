<script setup lang="ts">
import type { FieldProps } from './interface';
import { FormField } from '@/components/ui/form';
import { UiInput } from '@/components/ui/input';
import { UiTextarea } from '@/components/ui/textarea';
import { beautifyObjectName } from './utils';

const props = defineProps<FieldProps>();
const inputComponent = computed(() => props.config?.component === 'textarea' ? UiTextarea : UiInput);
</script>

<template>
    <FormField v-slot="slotProps" :name="fieldName">
        <UiFormItem v-bind="$attrs">
            <UiAutoFormLabel v-if="!config?.hideLabel" :required="required">
                {{ config?.label || beautifyObjectName(label ?? fieldName) }}
            </UiAutoFormLabel>
            <UiFormControl>
                <slot v-bind="slotProps">
                    <component
                        :is="inputComponent"
                        type="text"
                        v-bind="{ ...slotProps.componentField, ...config?.inputProps }"
                        :disabled="config?.inputProps?.disabled ?? disabled"
                    />
                </slot>
            </UiFormControl>
            <UiFormDescription v-if="config?.description">
                {{ config.description }}
            </UiFormDescription>
            <UiFormMessage />
        </UiFormItem>
    </FormField>
</template>
