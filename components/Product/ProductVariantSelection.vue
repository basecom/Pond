<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getProductRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    product: Schemas['Product'];
}>();

const { handleError } = useHandleError();
const { entityArrayToOptions } = useFormkitHelper();
const { handleChange, getOptionGroups, getSelectedOptions, findVariantForSelectedOptions, findBestMatchingVariant } =
    useProductConfigurator();
const isLoading = ref(false);

const isSelectedOption = (optionId: string) => Object.values(getSelectedOptions.value).includes(optionId);
const selectedOption = (group: Schemas['PropertyGroup']) => group?.options?.find(option => isSelectedOption(option.id));


const handleChangeVariant = async (groupName: string, optionId: string) => {
    // Prepare object with selected options after user input
    const selectedOptions = getSelectedOptions.value;
    selectedOptions[groupName] = optionId;

    // Try to find an exactly matching variant
    const exactVariantFound = await findVariantForSelectedOptions(selectedOptions);

    let selectedOptionsVariantPath;
    if (exactVariantFound) {
        // If an exactly matching variant was found, redirect to it
        selectedOptionsVariantPath = getProductRoute(exactVariantFound);

        try {
            await navigateTo(selectedOptionsVariantPath.path);
        } catch (error) {
            handleError('[Pond][ProductVariantSelection]: could not redirect', true);
        }
        return;
    }

    // If no exactly matching variant was found, try to find the best matching variant based on the option the user switched
    const matchingVariantFound = await findBestMatchingVariant(props.product.parentId ?? props.product.id, [optionId], groupName);
    if (!matchingVariantFound) {
        return;
    }

    selectedOptionsVariantPath = getProductRoute(matchingVariantFound);

    if (selectedOptionsVariantPath) {
        try {
            await navigateTo(selectedOptionsVariantPath.path);
        } catch (error) {
            handleError('[Pond][ProductVariantSelection]: could not redirect', true);
        }
    }
};

const onVariantChange = async (groupName: string, optionId: string) => {
    isLoading.value = true;
    await handleChange(groupName, optionId, () => {});
    await handleChangeVariant(groupName, optionId);
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

        <template v-if="group.displayType === 'select'">
            <FormKit
                type="select"
                :name="getTranslatedProperty(group, 'name')"
                :value="selectedOption(group)?.id"
                :classes="{
                    outer: {
                        'max-w-full min-w-32 w-full sm:w-fit': true,
                    },
                }"
                :options="entityArrayToOptions<Schemas['PropertyGroupOption']>(group.options.sort((a: Schemas['PropertyGroupOption'], b: Schemas['PropertyGroupOption']) => (a.position ?? 999) - (b.position ?? 999)), 'name', false) ?? []"
                @change="onVariantChange(group.translated.name, ($event.target as HTMLSelectElement)?.value)"
            />
        </template>

        <template v-else>
            <div class="grid grid-cols-8 gap-2">
                <template
                    v-for="option in group.options.sort((a: Schemas['PropertyGroupOption'], b: Schemas['PropertyGroupOption']) => (a.position ?? 999) - (b.position ?? 999))"
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
                        @click="onVariantChange(group.translated.name, option.id)"
                    />

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
                        @click="onVariantChange(group.translated.name, option.id)"
                    >
                        <img
                            :src="option.media.url"
                            :alt="getTranslatedProperty(option.media, 'alt') || option.media.fileName"
                            :title="getTranslatedProperty(option.media, 'title') || option.media.fileName"
                            class="rounded-full"
                        >
                    </FormKit>

                    <FormKit
                        v-else
                        :id="`option-${option.id}`"
                        type="button"
                        :label="getTranslatedProperty(option, 'name')"
                        :classes="{
                            input: {
                                'text-white hover:text-white hover:bg-brand-primary-dark border-brand-primary bg-brand-primary': product.optionIds?.includes(option.id) ?? false
                            },
                            outer: 'col-span-2',
                        }"
                        :name="`option-${option.id}`"
                        @click="onVariantChange(group.translated.name, option.id)"
                    />
                </template>
            </div>
        </template>
    </div>

    <UtilityLoadingSpinner
        v-if="isLoading"
        class="bg-white opacity-50"
    />
</template>
