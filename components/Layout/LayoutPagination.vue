<script setup lang="ts">
withDefaults(
    defineProps<{
        total: number;
        siblingCount?: number;
        itemsPerPage?: number;
        defaultPage?: number;
        page?: number
    }>(),
    {
        siblingCount: 1,
        itemsPerPage: 24,
        defaultPage: 1,
        page: 1,
    },
);

defineEmits<{
    'update-page': [page: number];
}>();

const { t } = useI18n();
</script>

<template>
    <PaginationRoot
        :total="total"
        :sibling-count="siblingCount"
        :default-page="defaultPage"
        :page="page"
        :items-per-page="itemsPerPage"
        show-edges
        @update:page="(value: number) => $emit('update-page', value)"
    >
        <PaginationList
            v-slot="{ items }"
            class="mt-10 flex items-center justify-center gap-1"
        >
            <PaginationFirst
                class="flex size-4 items-center justify-center rounded focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <FormKitIcon
                    icon="angles-left"
                    :title="t('icon.firstPage')"
                    class="size-4"
                />
            </PaginationFirst>

            <PaginationPrev
                class="mr-4 flex size-4 items-center justify-center rounded focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <FormKitIcon
                    icon="chevron-left"
                    :title="t('icon.previousPage')"
                    class="size-4"
                />
            </PaginationPrev>

            <template v-for="(page, index) in items">
                <PaginationListItem
                    v-if="page.type === 'page'"
                    :key="index"
                    class="data-[selected]:gray size-6 rounded transition focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 hover:bg-gray/10 data-[selected]:font-bold data-[selected]:text-brand-primary"
                    :value="page.value"
                >
                    {{ page.value }}
                </PaginationListItem>

                <PaginationEllipsis
                    v-else
                    :key="page.type"
                    :index="index"
                    class="flex size-4 items-center justify-center"
                >
                    &#8230;
                </PaginationEllipsis>
            </template>

            <PaginationNext
                class="ml-4 flex size-4 items-center justify-center rounded focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <FormKitIcon
                    icon="chevron-right"
                    :title="t('icon.nextPage')"
                    class="size-4"
                />
            </PaginationNext>

            <PaginationLast
                class="flex size-4 items-center justify-center rounded focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <FormKitIcon
                    icon="angles-right"
                    :title="t('icon.lastPage')"
                    class="size-4"
                />
            </PaginationLast>
        </PaginationList>
    </PaginationRoot>
</template>
