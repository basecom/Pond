<script setup lang="ts">
import type { NumberFieldInput } from 'radix-vue';

withDefaults(
    defineProps<{
      minPurchase: number;
      maxPurchase: number;
      steps: number;
      initialValue: number;
      isLoading?: boolean;
      isDisabled?: boolean;
    }>(),
    {
        minPurchase: 1,
        maxPurchase: 100,
        steps: 1,
        initialValue: 1,
        isLoading: false,
        isDisabled: false,
    },
);

const emit = defineEmits(['onUpdate', 'onEnter']);
const quantityInput: Ref<ComponentPublicInstance<typeof NumberFieldInput> | null> = ref(null);
const { t } = useI18n();

const onEnter = () => {
    quantityInput?.value?.$el?.blur();
    emit('onEnter');
};
</script>

<template>
    <NumberFieldRoot
        :disabled="isLoading || isDisabled"
        :locale="'de-DE'"
        :min="minPurchase"
        :max="maxPurchase"
        :step="steps"
        :default-value="initialValue"
        name="quantity"
        class="flex rounded-md border border-gray-medium bg-white px-3 py-2 shadow-sm sm:text-sm"
        :class="{
            'cursor-not-allowed': isLoading || isDisabled,
        }"
        @update:model-value="$emit('onUpdate', $event)"
    >
        <NumberFieldDecrement
            v-if="!isDisabled"
            class="data-[disabled]:opacity-20"
        >
            <FormKitIcon
                icon="minus"
                :title="t('icon.decrement')"
                class="block w-3"
            />
        </NumberFieldDecrement>

        <NumberFieldInput
            ref="quantityInput"
            class="w-14 text-center focus:outline-none"
            :class="{
                'cursor-not-allowed bg-transparent': isLoading || isDisabled,
            }"
            aria-label="Amount"
            @keyup.enter="onEnter"
        />

        <NumberFieldIncrement
            v-if="!isDisabled"
            class="data-[disabled]:opacity-20"
        >
            <FormKitIcon
                icon="plus"
                :title="t('icon.increment')"
                class="block w-3"
            />
        </NumberFieldIncrement>
    </NumberFieldRoot>
</template>
