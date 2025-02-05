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

const handleClick = (option: Schemas['ProductListingResult']['availableSortings'][0]) => {
    toggleState.value = false;
    emit('sorting-changed', option.key);
};
</script>

<template>
    <DropdownMenuRoot v-model:open="toggleState">
        <DropdownMenuTrigger
            class="flex items-center justify-between py-2 text-black"
            :aria-label="$t('listing.sidebar.sorting.ariaLabel')"
        >
            <span class="text-left">{{ $t('listing.sidebar.sorting.text') }}</span>
            <FormKitIcon
                :icon="toggleState ? 'chevron-up' : 'chevron-down'"
                class="ml-6 h-4 w-auto"
            />
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
            <DropdownMenuContent
                class="z-20 min-w-56 rounded-md border border-gray bg-white p-2 shadow-md outline-none"
                :side-offset="5"
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
