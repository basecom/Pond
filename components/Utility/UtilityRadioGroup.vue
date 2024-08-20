<script setup lang="ts">
import { getShippingMethodDeliveryTime } from "@shopware-pwa/helpers-next";

const props = defineProps<{
    model: any;
    group: any;
    itemKey: string;
}>();

const emit = defineEmits(['update:modelValue']);

const handleUpdate = (value: any) => {
    emit('update:modelValue', value);
}
</script>

<template>
    <RadioGroupRoot :modelValue="model" @update:modelValue="handleUpdate" class="flex gap-4 flex-wrap">
        <div
            v-for="item in group"
            :key="item[itemKey]"
            class="flex w-full"
        >
            <RadioGroupItem
                :value="item[itemKey]"
                class="flex items-center group"
            >
                <div class="min-w-[14px] min-h-[14px] rounded-[50%] outline outline-1 outline-gray-dark group-data-[state=checked]:outline-brand-primary-dark">
                    <RadioGroupIndicator class="flex items-center justify-center relative after:content-[''] after:block after:w-[10px] after:h-[10px] mt-[2px] after:rounded-[50%] after:bg-brand-primary-dark" />
                </div>

                <label
                    :for="item[itemKey]"
                    class="ml-2 block text-sm font-medium cursor-pointer text-left"
                >
                    <div class="flex justify-between">
                        <div>
                            <span
                                v-if="item.translated.name"
                            >
                              {{ item.translated.name }}
                            </span>

                            <span
                                v-if="getShippingMethodDeliveryTime(item)"
                            >
                                ({{ getShippingMethodDeliveryTime(item) }})
                            </span>

                            <span
                                v-if="item.translated.description"
                                class="italic text-sm text-secondary-500 block"
                            >
                                {{ item.translated.description }}
                            </span>
                        </div>

                        <div v-if="item.media?.url">
                            <img
                                loading="lazy"
                                :src="item.media.url"
                                :alt="`Logo of ${item.shortName}`"
                            />
                        </div>
                    </div>
                </label>
            </RadioGroupItem>
        </div>
    </RadioGroupRoot>
</template>
