<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        checkboxId: string;
        required?: boolean;
        condition?: boolean;
        checkboxLabel: string;
    }>(),
    {
        required: false,
        condition: false,
    },
);
</script>

<template>
    <CheckboxRoot :id="checkboxId" :name="checkboxId" class="flex items-center cursor-pointer group" :required="required">
        <div class="flex rounded outline outline-1 outline-gray-dark group-data-[state=checked]:outline-0 group-data-[state=checked]:bg-brand-primary-dark h-4 w-4">
            <CheckboxIndicator class="m-auto">
                <FormKitIcon
                    icon="check"
                    class="w-3 h-3 block text-white"
                />
            </CheckboxIndicator>
        </div>


        <label
            :for="checkboxId"
            class="ml-2 block text-sm font-medium cursor-pointer"
            :class="{ 'text-status-danger': condition }"
        >
            {{ checkboxLabel }}
        </label>
    </CheckboxRoot>
</template>