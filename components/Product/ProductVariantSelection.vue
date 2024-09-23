<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getProductRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    product: Schemas['Product'];
}>();

const { handleChange, getOptionGroups, getSelectedOptions, findVariantForSelectedOptions } = useProductConfigurator();
const isLoading = ref(false);

const isSelectedOption = (optionId: string) => Object.values(getSelectedOptions.value).includes(optionId);

const selectedOption = (group: Schemas['PropertyGroup']) => group?.options?.find(option => isSelectedOption(option.id));

const getSelectedOptionClasses = (id: string) => {
    if (props.product.optionIds?.includes(id)) {
        return 'text-white hover:text-white hover:bg-brand-primary-dark border-brand-primary bg-brand-primary';
    }

    return '';
};

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
</script>

<template>
    <div
        v-for="group in getOptionGroups"
        :key="`group-${group.id}`"
        class="w-full"
    >
        <div class="mb-2 flex gap-4 bg-gray-light px-4 py-2 text-lg">
            <span class="font-bold">
                {{ getTranslatedProperty(group, 'name') }}
            </span>
            <span>
                {{ getTranslatedProperty(selectedOption(group), 'name') }}
            </span>
        </div>
        <div class="grid grid-cols-8 gap-2">
            <template
                v-for="option in group.options"
                :key="`option-${option.id}`"
            >
                <FormKit
                    v-if="option.colorHexCode"
                    :id="`option-${option.id}`"
                    type="button"
                    :label="getTranslatedProperty(option, 'name')"
                    :classes="{
                        input: {
                            $reset: true,
                            'w-full h-full rounded-full text-transparent': true,
                        },
                        wrapper: {
                            'border-2 rounded-full h-10 aspect-square': true,
                            'border-brand-primary p-1': isSelectedOption(option.id),
                            'border-gray-light': !isSelectedOption(option.id),
                        },
                        outer: 'col-span-1',
                    }"
                    :style="`background-color: ${option.colorHexCode}`"
                    :name="`option-${option.id}`"
                    @click="handleChange(group.name, option.id, handleChangeVariant)"
                ></FormKit>
                <FormKit
                    v-else-if="option.media"
                    :id="`option-${option.id}`"
                    type="button"
                    :label="getTranslatedProperty(option, 'name')"
                    :classes="{
                        input: {
                            $reset: true,
                            'w-full h-full rounded-full': true,
                        },
                        wrapper: {
                            'border-2 rounded-full h-10 aspect-square': true,
                            'border-brand-primary p-1': isSelectedOption(option.id),
                            'border-gray-light': !isSelectedOption(option.id),
                        },
                        outer: 'col-span-1',
                    }"
                    :style="`background-color: ${option.colorHexCode}`"
                    :name="`option-${option.id}`"
                    @click="handleChange(group.name, option.id, handleChangeVariant)"
                >
                    <img
                        :src="option.media.url"
                        :alt="
                            getTranslatedProperty(option.media, 'alt') ??
                            getTranslatedProperty(option.media, 'title') ??
                            option.media.fileName
                        "
                        class="rounded-full"
                    />
                </FormKit>
                <FormKit
                    v-else
                    :id="`option-${option.id}`"
                    type="button"
                    :label="getTranslatedProperty(option, 'name')"
                    :classes="{
                        input: getSelectedOptionClasses(option.id),
                        outer: 'col-span-2',
                    }"
                    :name="`option-${option.id}`"
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
