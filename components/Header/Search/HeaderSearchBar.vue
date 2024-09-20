<script setup lang="ts">
import { getProductRoute } from '@shopware-pwa/helpers-next';

const props = withDefaults(
    defineProps<{
        displayTotal?: number;
        minCharacters?: number;
    }>(),
    {
        displayTotal: 10,
        minCharacters: 3,
    },
);

defineEmits(['closeSearch']);

const { searchTerm, search, getProducts, getTotal, loading } = useProductSearchSuggest();
const { push } = useRouter();

// String the user has typed in the search field
const typingQuery = ref('');

// Reference to the searchInput to focus it onMount
const searchInput = ref(null);

// Perform search if input is greater or equal to the minimum characters prop
watch(typingQuery, (value: string) => {
    if (value.length >= props.minCharacters) {
        performSuggestSearch(value);
    }
});

// Defer the search request to prevent the search from instantly being triggered after every character typed
const performSuggestSearch = useDebounceFn((value: string) => {
    searchTerm.value = value;
    search();
}, 300);

// Suggest results will only be shown, when the user has typed more than the minimum characters prop in the search field
const showSuggest = computed(() => {
    return typingQuery.value.length >= props.minCharacters;
});

// Redirect to search page when pressing enter
const handleEnter = () => {
    if (typingQuery.value.length >= 1) {
        push('/search?search=' + typingQuery.value);
    }
};

onMounted(() => {
    // Get the input from the ref (need querySelector since the ref returns the FormKit wrapper and not the input itself)
    searchInput.value.$el.querySelector('input').focus();
});
</script>

<template>
    <div class="fixed w-full border-b border-gray-medium bg-white">
        <div class="container flex gap-4 py-4">
            <FormKit
                ref="searchInput"
                v-model="typingQuery"
                type="text"
                prefix-icon="search"
                :floating-label="false"
                :classes="{
                    inner: 'focus-within:ring-[0] focus-within:border-0 shadow-none border-0 gap-4 p-[0]',
                    outer: 'w-full',
                    input: 'border-b border-gray-medium py-1',
                }"
                placeholder="Search for products"
                @keyup.enter="
                    () => {
                        handleEnter();
                        $emit('closeSearch');
                    }
                "
            />
        </div>

        <div
            v-if="showSuggest"
            class="z-1 container fixed left-0 right-0 rounded-b-md border-t border-gray-medium bg-white p-0 shadow-md"
        >
            <NuxtLink
                v-for="product in getProducts?.slice(0, displayTotal)"
                :key="product.id"
                :to="getProductRoute(product)"
                @click="$emit('closeSearch')"
            >
                <HeaderSearchSuggestions :product="product" />
            </NuxtLink>

            <div class="bg-gray-light text-center text-sm hover:bg-gray-medium">
                <div
                    v-if="loading"
                    class="py-3"
                >
                    <div class="relative h-1lh">
                        <UtilityLoadingSpinner size="small" />
                    </div>
                </div>

                <template v-else>
                    <NuxtLink
                        v-if="getTotal > 0"
                        :to="'/search?search=' + typingQuery"
                        class="block w-full py-3"
                    >
                        <template v-if="getTotal > 1">
                            <span>View all {{ getTotal }} results</span>
                        </template>
                        <template v-else>
                            <span>View the result</span>
                        </template>
                    </NuxtLink>

                    <div
                        v-else
                        class="py-3"
                    >
                        No results
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
