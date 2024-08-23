<script setup lang="ts">

import type { CmsElementProductDescriptionReviews } from '@shopware-pwa/composables-next';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    element: CmsElementProductDescriptionReviews;
}>();
const {product} = useProduct(props.element.data.product);
const propertyGroups = ref<Schemas['PropertyGroup'][]>();

propertyGroups.value = product.value.properties
    .map((obj: Schemas['PropertyGroupOption']) => obj.group)
    .filter((obj: Schemas['PropertyGroup'], index: number, arr: Schemas['PropertyGroup'][]) => {
        return arr.findIndex((item: Schemas['PropertyGroup']) => item.id === obj.id) === index;
    });
console.log(propertyGroups);
const getPropertiesOfGroup = (groupId: string): Schemas['PropertyGroupOption'][] => {
    return product.value.properties.filter((propertiy: Schemas['PropertyGroupOption']) => propertiy.group.id === groupId);
};
</script>

<template>
    <div class="flex flex-col gap-4">
<!--        <div class="flex flex-col gap-4">-->
<!--            <div class="text-xl font-bold">description</div>-->
<!--            <div>-->
<!--                {{element.data.product.translated.description}}-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="flex flex-col gap-4">-->
<!--            <div class="text-xl font-bold">eigenschaften</div>-->
<!--        </div>-->
<!--        <div class="flex flex-col gap-4">-->
<!--            <div class="text-xl font-bold">bewertungen</div>-->
<!--        </div>-->
        <div class="text-xl font-bold">description</div>
        <div class="flex flex-col gap-4 md:flex-row">
            <div
                class="flex-grow"
            >
                {{ getTranslatedProperty(product, 'description') }}
            </div>
            <div
                class="w-full md:w-96 shrink-0"
            >
                <table class="table-auto w-full">
                    <tbody>
                        <tr
                            v-for="(group, index) in propertyGroups"
                            :key="`group-${group.id}`"
                            :class="{
                                'bg-gray-light': index % 2 === 0
                            }"
                        >
                            <td class="py-2 px-4 font-bold">{{ getTranslatedProperty(group, 'name') }}</td>
                            <td class="py-2 px-4">
                                <template v-for="(property, index) in getPropertiesOfGroup(group.id)">
                                    {{getTranslatedProperty(property, 'name')}}<template v-if="index + 1 !==getPropertiesOfGroup(group.id).length">, </template>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <SharedAccordion :default-value="'desc'">
            <SharedAccordionItem value="desc">
                <template #title>description</template>
                <template #contet>{{element.data.product.translated.description}}</template>
            </SharedAccordionItem>
            <SharedAccordionItem value="properties">
                <template #title>properties</template>
                <template #contet>here will be properties</template>
            </SharedAccordionItem>
            <SharedAccordionItem value="rating">
                <template #title>rating</template>
                <template #contet>here will be ratings</template>
            </SharedAccordionItem>
        </SharedAccordion>
    </div>
</template>

<style scoped>

</style>