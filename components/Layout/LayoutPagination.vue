<script setup lang="ts">
import {
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
    PaginationRoot,
} from 'radix-vue';

withDefaults(
    defineProps<{
        total: number;
        siblingCount?: number;
        itemsPerPage?: number;
        defaultPage?: number;
    }>(),
    {
        siblingCount: 1,
        itemsPerPage: 24,
        defaultPage: 1,
    },
);

defineEmits<{
    'update-page': [page: number];
}>();
</script>

<template>
    <PaginationRoot
        :total="total"
        :sibling-count="siblingCount"
        :default-page="defaultPage"
        :items-per-page="itemsPerPage"
        show-edges
        @update:page="value => $emit('update-page', value)"
    >
        <PaginationList
            v-slot="{ items }"
            class="mt-10 flex items-center justify-center gap-1"
        >
            <PaginationFirst
                class="flex h-4 w-4 items-center justify-center rounded focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 disabled:opacity-50"
            >
                <FormKitIcon
                    icon="angles-left"
                    class="h-4 w-4"
                />
            </PaginationFirst>

            <PaginationPrev
                class="mr-4 flex h-4 w-4 items-center justify-center rounded focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 disabled:opacity-50"
            >
                <FormKitIcon
                    icon="chevron-left"
                    class="h-4 w-4"
                />
            </PaginationPrev>

            <template v-for="(page, index) in items">
                <PaginationListItem
                    v-if="page.type === 'page'"
                    :key="index"
                    class="data-[selected]:gray h-6 w-6 rounded transition focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 hover:bg-gray/10 data-[selected]:font-bold data-[selected]:text-brand-primary"
                    :value="page.value"
                >
                    {{ page.value }}
                </PaginationListItem>

                <PaginationEllipsis
                    v-else
                    :key="page.type"
                    :index="index"
                    class="flex h-4 w-4 items-center justify-center"
                >
                    &#8230;
                </PaginationEllipsis>
            </template>

            <PaginationNext
                class="ml-4 flex h-4 w-4 items-center justify-center rounded focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 disabled:opacity-50"
            >
                <FormKitIcon
                    icon="chevron-right"
                    class="h-4 w-4"
                />
            </PaginationNext>

            <PaginationLast
                class="flex h-4 w-4 items-center justify-center rounded focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 disabled:opacity-50"
            >
                <FormKitIcon
                    icon="angles-right"
                    class="h-4 w-4"
                />
            </PaginationLast>
        </PaginationList>
    </PaginationRoot>
</template>
