<script setup lang="ts">
import type { FieldProps } from './interface';
import { cn } from '@/lib/utils';
import { FormField } from '@/components/ui/form';

import { DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { CalendarIcon } from 'lucide-vue-next';
import { beautifyObjectName, maybeBooleanishToBoolean } from './utils';

defineProps<FieldProps>();

const df = new DateFormatter('en-US', {
    dateStyle: 'long',
});
</script>

<template>
    <FormField v-slot="slotProps" :name="fieldName">
        <UiFormItem>
            <UiAutoFormLabel v-if="!config?.hideLabel" :required="required">
                {{ config?.label || beautifyObjectName(label ?? fieldName) }}
            </UiAutoFormLabel>
            <UiFormControl>
                <slot v-bind="slotProps">
                    <div>
                        <UiPopover>
                            <UiPopoverTrigger as-child :disabled="maybeBooleanishToBoolean(config?.inputProps?.disabled) ?? disabled">
                                <UiButton
                                    variant="outline"
                                    :class="cn(
                                        'w-full justify-start text-left font-normal',
                                        !slotProps.componentField.modelValue && 'text-gray-500',
                                    )"
                                >
                                    <CalendarIcon class="mr-2 size-4" />
                                    {{ slotProps.componentField.modelValue ? df.format(slotProps.componentField.modelValue.toDate(getLocalTimeZone())) : "Pick a date" }}
                                </UiButton>
                            </UiPopoverTrigger>
                            <UiPopoverContent class="w-auto p-0">
                                <UiCalendar initial-focus v-bind="slotProps.componentField" />
                            </UiPopoverContent>
                        </UiPopover>
                    </div>
                </slot>
            </UiFormControl>

            <UiFormDescription v-if="config?.description">
                {{ config.description }}
            </UiFormDescription>
            <UiFormMessage />
        </UiFormItem>
    </FormField>
</template>
