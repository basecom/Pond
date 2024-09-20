<script setup lang="ts">
import type { CmsElementProductDescriptionReviews } from '@shopware-pwa/composables-next';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    element: CmsElementProductDescriptionReviews;
}>();
const { product } = useProduct(props.element.data.product);
const propertyGroups = ref<Schemas['PropertyGroup'][]>();

propertyGroups.value = product.value.properties
    .map((obj: Schemas['PropertyGroupOption']) => obj.group)
    .filter((obj: Schemas['PropertyGroup'], index: number, arr: Schemas['PropertyGroup'][]) => {
        return arr.findIndex((item: Schemas['PropertyGroup']) => item.id === obj.id) === index;
    });

const getPropertiesOfGroup = (groupId: string): Schemas['PropertyGroupOption'][] => {
    return product.value.properties.filter((property: Schemas['PropertyGroupOption']) => property.group.id === groupId);
};
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="text-xl font-bold">{{ $t('cms.element.product.descriptionHeading') }}</div>
        <div class="flex flex-col gap-4 md:flex-row">
            <div
                class="flex-grow"
                v-html="getTranslatedProperty(product, 'description')"
            />

            <div class="w-full shrink-0 md:w-96">
                <table class="w-full table-auto">
                    <tbody>
                        <tr
                            v-for="(group, index) in propertyGroups"
                            :key="`group-${group.id}`"
                            :class="{
                                'bg-gray-light': index % 2 === 0,
                            }"
                        >
                            <td class="px-4 py-2 font-bold">{{ getTranslatedProperty(group, 'name') }}</td>
                            <td class="px-4 py-2">
                                <template v-for="(property, index) in getPropertiesOfGroup(group.id)">
                                    {{ getTranslatedProperty(property, 'name')
                                    }}<template v-if="index + 1 !== getPropertiesOfGroup(group.id).length">, </template>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
