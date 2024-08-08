<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getProductRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
  // propertyGroups: Schemas["PropertyGroup"][];
  product: Schemas["Product"];
}>();
// const { configurator: propertyGroups, changeVariant } = useProduct(props.product)

// const isLoading = ref(false);
// const isSelectedOption = (id: string) => {
//   return props.product.optionIds?.includes(id);
// }
const isSelectedOption = (optionId: string) => Object.values(getSelectedOptions.value).includes(optionId);
const getSelectedOptionClasses = (id: string) => {
  if (props.product.optionIds?.includes(id)) {
    return 'text-white hover:text-white hover:bg-brand-primary-dark border-brand-primary bg-brand-primary'
  }
  return '';
}
const { handleChange, getOptionGroups, getSelectedOptions, findVariantForSelectedOptions, isLoadingOptions } = useProductConfigurator();

const handleChangeVariant = async () => {
  const variantFound = await findVariantForSelectedOptions(getSelectedOptions.value);

  const selectedOptionsVariantPath = getProductRoute(variantFound);
  if (selectedOptionsVariantPath) {
    try {
      await navigateTo(selectedOptionsVariantPath.path);
    } catch (error) {
      console.error('could not redirect');
    }
  }
}

const selectedOption = (group) => group.options.find(option => isSelectedOption(option.id))
</script>

<template>
  <div
    class="block w-full"
  >
    <div
      v-for="group in getOptionGroups"
      :key="`group_${group.id}`"
    >
      {{getTranslatedProperty(group, 'name')}}: {{getTranslatedProperty(selectedOption(group), 'name')}}
      <div class="flex gap-2">
        <template
          v-for="option in group.options"
          :key="`option_${option.id}`"
        >
          <div
            v-if="option.colorHexCode"
            type="button"
            :aria-label="getTranslatedProperty(option, 'name')"
            class="h-10 aspect-square rounded-full border-2"
            :class="[isSelectedOption(option.id) ? 'border-brand-primary p-1' : 'border-gray-light']"
            @click="handleChange(group.name, option.id, handleChangeVariant)"
          >
            <button
              class="w-full h-full rounded-full"
              :style="`background-color: ${option.colorHexCode}`"
            ></button>
          </div>
          <div
            v-else-if="option.media"
            type="button"
            :aria-label="getTranslatedProperty(option, 'name')"
            class="h-10 aspect-square rounded-full border-2"
            :class="[isSelectedOption(option.id) ? 'border-brand-primary p-1' : 'border-gray-light']"
            @click="handleChange(group.name, option.id, handleChangeVariant)"
          >
            <button
              class="w-full h-full rounded-full"
            >
              <img
                :src="option.media.url"
                alt=""
                class="rounded-full"
              >
            </button>
          </div>
          <FormKit
            v-else
            type="button"
            :label="getTranslatedProperty(option, 'name')"
            :classes="{
              input: getSelectedOptionClasses(option.id)
            }"
            @click="handleChange(group.name, option.id, handleChangeVariant)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>