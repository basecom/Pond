<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const { options, selectedOption } = defineProps<{
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
                class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] outline-none will-change-[opacity,transform] border border-gray"
                :side-offset="5"
            >
                <DropdownMenuItem
                    v-for="option in options"
                    :key="option.key"
                    :value="option.key"
                    class="px-2 pl-4 outline-none data-[disabled]:pointer-events-none data-[highlighted]:text-black cursor-pointer"
                    :class="{
                        'text-black': option.key === selectedOption,
                        'text-gray-dark': option.key !== selectedOption
                    }"
                    @click="() => handleClick(option)"
                >
                    {{ option.label }}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenuPortal>
    </DropdownMenuRoot>
</template>

<style scoped></style>
