<script setup lang="ts">
import type { FieldProps } from './interface';
import { FormField } from '@/components/ui/form';
import { Trash } from 'lucide-vue-next';
import { ref } from 'vue';
import AutoFormLabel from './AutoFormLabel.vue';
import { beautifyObjectName } from './utils';

defineProps<FieldProps>();

const inputFile = ref<File>();
async function parseFileAsString(file: File | undefined): Promise<string> {
    return new Promise((resolve, reject) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = (err) => {
                reject(err);
            };
            reader.readAsDataURL(file);
        }
    });
}
</script>

<template>
    <FormField v-slot="slotProps" :name="fieldName">
        <UiFormItem v-bind="$attrs">
            <AutoFormLabel v-if="!config?.hideLabel" :required="required">
                {{ config?.label || beautifyObjectName(label ?? fieldName) }}
            </AutoFormLabel>
            <UiFormControl>
                <slot v-bind="slotProps">
                    <UiInput
                        v-if="!inputFile"
                        type="file"
                        v-bind="{ ...config?.inputProps }"
                        :disabled="config?.inputProps?.disabled ?? disabled"
                        @change="async (ev: InputEvent) => {
                            const file = (ev.target as HTMLInputElement).files?.[0]
                            inputFile = file
                            const parsed = await parseFileAsString(file)
                            slotProps.componentField.onInput(parsed)
                        }"
                    />
                    <div v-else class="border-gray-200 flex h-9 w-full items-center justify-between rounded-md border bg-transparent py-1 pl-3 pr-1 text-sm shadow-sm transition-colors">
                        <p>{{ inputFile?.name }}</p>
                        <UiButton
                            :size="'icon'"
                            :variant="'ghost'"
                            class="size-[26px]"
                            aria-label="Remove file"
                            type="button"
                            @click="() => {
                                inputFile = undefined
                                slotProps.componentField.onInput(undefined)
                            }"
                        >
                            <Trash />
                        </UiButton>
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
