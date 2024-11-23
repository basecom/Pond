<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../types/listing/filter';
import type { ValueOf } from '../../types/valueof';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    filter: ListingFilter & Schemas['PropertyGroup'];
    selectedValues: Schemas['ProductListingResult']['currentFilters'];
}>();

const emits = defineEmits<{
    'filter-changed': [
        event: {
            code: 'price';
            value: ValueOf<Schemas['ProductListingResult']['currentFilters']['properties']>;
        },
    ];
}>();

// const { currency } = useSessionContext();
// const filterMax = computed(() => Math.ceil(parseFloat(props.filter.max)) || 0);
// const filterMin = computed(() => Math.floor(parseFloat(props.filter.min)) || 0);
// const currentValue = ref([
//     props.selectedValues.price.min || filterMin.value || 0,
//     props.selectedValues.price.max || filterMax.value || 0,
// ]);
//
watch(props, () => {
    // currentValue.value = [
    //     props.selectedValues.price.min || filterMin.value || 0,
    //     props.selectedValues.price.max || filterMax.value || 0,
    // ];
});


// TODO selected values filter und nur die drin lassen, die auch in filter.options drin sind

const { entityArrayToOptions } = useFormkitHelper();
const selection = ref([])
watch(selection, newSelection => emits('filter-changed', {code: 'properties', value: newSelection}))
</script>

<template>
<!--    <SharedPopover :with-close-button="false">-->
<!--        <template #trigger>-->
<!--            <div class="px-4 py-2 border border-gray rounded">-->
<!--                {{ getTranslatedProperty(filter, 'name') }}-->
<!--            </div>-->
<!--        </template>-->

<!--        <template #content>-->

<!--            <FormKit-->
<!--                type="checkbox"-->
<!--                :label="$t('account.register.terms.label')"-->
<!--                :help="$t('account.register.terms.help')"-->
<!--                name="terms"-->
<!--                decorator-icon="check"-->
<!--            />-->
<!--        </template>-->
<!--    </SharedPopover>-->
<!-- copied shared popover, as formkit component could not be added to template#content. popover just disappeared without any error -->
    <PopoverRoot>
        <PopoverTrigger
            class="none inline-flex items-center justify-center"
            :aria-label="$t('shared.popover.triggerAriaLabel')"
        >
            <slot name="trigger">
                {{ getTranslatedProperty(filter, 'name') }}
            </slot>
        </PopoverTrigger>
        <PopoverContent
            side="bottom"
            :side-offset="5"
            class="w-64 rounded border border-gray-light bg-white p-4 shadow-md"
        >
            <div>
                <!-- just for debugging start -->
                <span v-for="option in selection">
                    {{option}}<br>
                </span>
                <!-- just for debugging end -->
                <FormKit
                    v-model="selection"
                    type="checkbox"
                    :options="entityArrayToOptions(filter.options, 'name')"
                    :name="getTranslatedProperty(filter, 'name')"
                    decorator-icon="check"
                />
            </div>
        </PopoverContent>
    </PopoverRoot>
</template>
