<script setup lang="ts">
import type { FieldProps } from './interface';
import { UiCheckbox } from '@/components/ui/checkbox';
import { UiSwitch } from '@/components/ui/switch';
import { computed } from 'vue';
import AutoFormLabel from './AutoFormLabel.vue';
import { beautifyObjectName, maybeBooleanishToBoolean } from './utils';

const props = defineProps<FieldProps>();

const booleanComponent = computed(() => props.config?.component === 'switch' ? UiSwitch : UiCheckbox);
</script>

<template>
    <FormField v-slot="slotProps" :name="fieldName">
        <UiFormItem>
            <div class="mb-3 flex items-center gap-3 space-y-0">
                <UiFormControl>
                    <slot v-bind="slotProps">
                        <component
                            :is="booleanComponent"
                            :disabled="maybeBooleanishToBoolean(config?.inputProps?.disabled) ?? disabled"
                            :name="slotProps.componentField.name"
                            :model-value="slotProps.componentField.modelValue"
                            @update:model-value="slotProps.componentField['onUpdate:modelValue']"
                        />
                    </slot>
                </UiFormControl>
                <AutoFormLabel v-if="!config?.hideLabel" :required="required">
                    {{ config?.label || beautifyObjectName(label ?? fieldName) }}
                </AutoFormLabel>
            </div>

            <UiFormDescription v-if="config?.description">
                {{ config.description }}
            </UiFormDescription>
            <UiFormMessage />
        </UiFormItem>
    </FormField>
</template>
