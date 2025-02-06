<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    options: Schemas['ProductListingResult']['availableSortings'];
    selectedOption: Schemas['ProductListingResult']['sorting'];
}>();
const emit = defineEmits<{
    'sorting-changed': [key: Schemas['ProductListingResult']['sorting']];
}>();

const toggleState = ref(false);
const getSortingName = computed(() => {
    const selectedOptionName = props.options.filter(
        (option: Schemas['ProductSorting']) => option.key === props.selectedOption,
    );
    return selectedOptionName?.[0]?.translated?.label ?? t('listing.sidebar.sorting.text');
});

const handleClick = (option: Schemas['ProductListingResult']['availableSortings'][0]) => {
    toggleState.value = false;
    emit('sorting-changed', option.key);
};
</script>

<template>
    <DropdownMenuRoot v-model:open="toggleState">
        <DropdownMenuTrigger
            class="flex items-center gap-2 rounded border border-gray-medium px-4 py-2"
            :aria-label="$t('listing.sidebar.sorting.ariaLabel')"
        >
            <span class="text-left">
                {{ getSortingName }}
            </span>

            <FormKitIcon
                class="block h-3 w-3 text-gray transition-all duration-150"
                :class="{
                    'rotate-180': toggleState,
                }"
                icon="chevron-down"
            />
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
            <DropdownMenuContent
                class="z-20 min-w-64 rounded border border-gray-medium bg-white p-4 shadow-lg outline-none"
                :side-offset="5"
                side="bottom"
                align="end"
            >
                <DropdownMenuItem
                    v-for="option in props.options"
                    :key="option.key"
                    :value="option.key"
                    class="cursor-pointer px-2 pl-4 outline-none data-[disabled]:pointer-events-none data-[highlighted]:text-black"
                    :class="{
                        'text-black': option.key === props.selectedOption,
                        'text-gray-dark': option.key !== props.selectedOption,
                    }"
                    @click="() => handleClick(option)"
                >
                    {{ option.label }}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenuPortal>
    </DropdownMenuRoot>
</template>
