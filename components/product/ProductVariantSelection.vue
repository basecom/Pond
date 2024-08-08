<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getProductRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    product: Schemas['Product'];
}>();

const isLoading = ref(false);

const isSelectedOption = (optionId: string) => Object.values(getSelectedOptions.value).includes(optionId);

const getSelectedOptionClasses = (id: string) => {
    if (props.product.optionIds?.includes(id)) {
        return 'text-white hover:text-white hover:bg-brand-primary-dark border-brand-primary bg-brand-primary';
    }
    return '';
};
const { handleChange, getOptionGroups, getSelectedOptions, findVariantForSelectedOptions } = useProductConfigurator();

const handleChangeVariant = async () => {
    isLoading.value = true;
    const variantFound = await findVariantForSelectedOptions(getSelectedOptions.value);

    const selectedOptionsVariantPath = getProductRoute(variantFound);
    if (selectedOptionsVariantPath) {
        try {
            await navigateTo(selectedOptionsVariantPath.path);
        } catch (error) {
            console.error('could not redirect');
        }
    }
    isLoading.value = false;
};

const selectedOption = (group: Schemas['PropertyGroup']) => group?.options?.find(option => isSelectedOption(option.id));
</script>

<template>
    <div
        v-for="group in getOptionGroups"
        :key="`group_${group.id}`"
        class="w-full"
    >
        <div class="bg-gray-light text-lg mb-2 px-4 py-2 flex gap-4">
            <div class="font-bold">
                {{ getTranslatedProperty(group, 'name') }}
            </div>
            <div>
                {{ getTranslatedProperty(selectedOption(group), 'name') }}
            </div>
        </div>
        <div class="grid grid-cols-8 gap-2">
            <template
                v-for="option in group.options"
                :key="`option_${option.id}`"
            >
                <div
                    v-if="option.colorHexCode"
                    type="button"
                    :aria-label="getTranslatedProperty(option, 'name')"
                    class="aspect-square h-10 rounded-full border-2 col-span-1"
                    :class="[isSelectedOption(option.id) ? 'border-brand-primary p-1' : 'border-gray-light']"
                    @click="handleChange(group.name, option.id, handleChangeVariant)"
                >
                    <button
                        class="h-full w-full rounded-full"
                        :style="`background-color: ${option.colorHexCode}`"
                    ></button>
                </div>
                <div
                    v-else-if="option.media"
                    type="button"
                    :aria-label="getTranslatedProperty(option, 'name')"
                    class="aspect-square h-10 rounded-full border-2 col-span-1"
                    :class="[isSelectedOption(option.id) ? 'border-brand-primary p-1' : 'border-gray-light']"
                    @click="handleChange(group.name, option.id, handleChangeVariant)"
                >
                    <button class="h-full w-full rounded-full">
                        <img
                            :src="option.media.url"
                            alt=""
                            class="rounded-full"
                        />
                    </button>
                </div>
                <FormKit
                    v-else
                    type="button"
                    :label="getTranslatedProperty(option, 'name')"
                    :classes="{
                        input: getSelectedOptionClasses(option.id),
                        outer: 'col-span-2'
                    }"
                    @click="handleChange(group.name, option.id, handleChangeVariant)"
                />
            </template>
        </div>
    </div>
    <UtilityLoadingSpinner
        v-if="isLoading"
        class="bg-white opacity-50"
    />
</template>
