<script setup lang="ts">
import type { FieldProps } from './interface';
import { FormField } from '@/components/ui/form';
import AutoFormLabel from './AutoFormLabel.vue';
import { beautifyObjectName, maybeBooleanishToBoolean } from './utils';

defineProps<FieldProps & {
  options?: string[]
}>();
</script>

<template>
    <FormField v-slot="slotProps" :name="fieldName">
        <UiFormItem>
            <AutoFormLabel v-if="!config?.hideLabel" :required="required">
                {{ config?.label || beautifyObjectName(label ?? fieldName) }}
            </AutoFormLabel>
            <UiFormControl>
                <slot v-bind="slotProps">
                    <UiRadioGroup
                        v-if="config?.component === 'radio'"
                        :disabled="maybeBooleanishToBoolean(config?.inputProps?.disabled) ?? disabled"
                        :orientation="'vertical'"
                        v-bind="{ ...slotProps.componentField }"
                    >
                        <div v-for="(option, index) in options" :key="option" class="mb-2 flex items-center gap-3 space-y-0">
                            <UiRadioGroupItem :id="`${option}-${index}`" :value="option" />
                            <UiLabel :for="`${option}-${index}`">{{ beautifyObjectName(option) }}</UiLabel>
                        </div>
                    </UiRadioGroup>

                  <!-- todo: nele das hiert sorgt für error -->
<!--                    <UiSelect v-else :disabled="maybeBooleanishToBoolean(config?.inputProps?.disabled) ?? disabled" v-bind="{ ...slotProps.componentField }">-->
<!--                        <UiSelectTrigger class="w-full">-->
<!--                            <UiSelectValue :placeholder="config?.inputProps?.placeholder" />-->
<!--                        </UiSelectTrigger>-->
<!--                        <UiSelectContent>-->
<!--                            <UiSelectItem v-for="option in options" :key="option" :value="option">-->
<!--                                {{ beautifyObjectName(option) }}-->
<!--                            </UiSelectItem>-->
<!--                        </UiSelectContent>-->
<!--                    </UiSelect>-->
                </slot>
            </UiFormControl>

            <UiFormDescription v-if="config?.description">
                {{ config.description }}
            </UiFormDescription>
            <UiFormMessage />
        </UiFormItem>
    </FormField>
</template>
