<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getProductRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    product: Schemas['Product'];
}>();

const { handleChange, getOptionGroups, getSelectedOptions, findVariantForSelectedOptions, findBestMatchingVariant } =
    useProductConfigurator();
const isLoading = ref(false);

const isSelectedOption = (optionId: string) => Object.values(getSelectedOptions.value).includes(optionId);

const selectedOption = (group: Schemas['PropertyGroup']) => group?.options?.find(option => isSelectedOption(option.id));

const getSelectedOptionClasses = (id: string) => {
    if (props.product.optionIds?.includes(id)) {
        return 'text-white hover:text-white hover:bg-brand-primary-dark border-brand-primary bg-brand-primary';
    }

    return '';
};

const handleChangeVariant = async (switchedGroup, switchedName) => {
    isLoading.value = true;

    // Prepare object with selected options after user input
    const selectedOptions = getSelectedOptions.value;
    selectedOptions[switchedName] = switchedGroup;

    // Try to find an exactly matching variant
    const exactVariantFound = await findVariantForSelectedOptions(selectedOptions);

    let selectedOptionsVariantPath;
    if (exactVariantFound) {
        // If an exactly matching variant was found, redirect to it
        selectedOptionsVariantPath = getProductRoute(exactVariantFound);
    } else {
        // If no exactly matching variant was found, try to find the best matching variant based on the option the user switched
        const switchedOptions = {};
        switchedOptions[switchedName] = switchedGroup;

        const matchingVariantFound = await findBestMatchingVariant(
            props.product.parentId ?? props.product.id,
            switchedOptions,
        );
        selectedOptionsVariantPath = getProductRoute(matchingVariantFound);
    }

    if (selectedOptionsVariantPath) {
        try {
            await navigateTo(selectedOptionsVariantPath.path);
        } catch (error) {
            console.error('could not redirect');
        }
    }

    isLoading.value = false;
};

const { entityArrayToOptions } = useFormkitHelper();
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
            <template v-if="group.displayType === 'select'">
                <FormKit
                    type="select"
                    :name="getTranslatedProperty(group, 'name')"
                    :value="selectedOption(group)?.id"
                    :classes="{
                        outer: {
                            'w-full sm:w-32': true,
                        },
                    }"
                    :options="entityArrayToOptions<Schemas['PropertyGroupOption']>(group.options, 'name', true) ?? []"
                    @change="
                        handleChange(
                            group.name,
                            $event.target.value,
                            handleChangeVariant($event.target.value, group.name),
                        )
                    "
                />
            </template>

            <template v-else>
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
                        @click="handleChange(group.name, option.id, handleChangeVariant(option.id, group.name))"
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
                        @click="handleChange(group.name, option.id, handleChangeVariant(option.id, group.name))"
                    >
                        <img
                            :src="option.media.url"
                            :alt="
                                getTranslatedProperty(option.media, 'alt') ??
                                    getTranslatedProperty(option.media, 'title') ??
                                    option.media.fileName
                            "
                            class="rounded-full"
                        >
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
                        @click="handleChange(group.name, option.id, handleChangeVariant(option.id, group.name))"
                    />
                </template>
            </template>
        </div>
    </div>
    <UtilityLoadingSpinner
        v-if="isLoading"
        class="bg-white opacity-50"
    />
</template>
