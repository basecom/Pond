<script setup lang="ts">
import { getProductRoute } from '@shopware-pwa/helpers-next';
import type { Schemas } from '@shopware/api-client/api-types';

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

const emit = defineEmits(['closeSearch']);

const { searchTerm, search, getProducts, getTotal, loading } = useProductSearchSuggest();
const { trackSearchSuggestions, trackSearch, trackSelectItem } = useAnalytics();

const router = useRouter();

// String the user has typed in the search field
const typingQuery = ref('');

// If the user is on the result page, hide suggestions since the listing is automatically updated
const isResultPage = ref(false);
const route = useRoute();
if (route.path === '/search') {
    isResultPage.value = true;
}

// Use searchStore to share searchTerm with search result page
const searchStore = useSearchStore();
// Defer the search request to prevent the search from instantly being triggered, 500ms fixes holding backspace triggering twice
const performDebouncedSearch = useDebounceFn(async (value: string) => {
    // Only perform search and update valid searchTerm if searchTerm is longer than minCharacters
    if (value.length >= props.minCharacters) {
        searchTerm.value = value;
        searchStore.updateLastValidSearchTerm(value);

        // Update URL with new valid search term
        if (isResultPage.value) {
            router.push({
                query: {
                    search: value,
                },
            });
        }
        await search();
        trackSearchSuggestions();
    }
}, 500);

watch(typingQuery, (value: string) => {
    // Update searchTerm in searchStore
    searchStore.updateSearchTerm(value);
    performDebouncedSearch(value);
});

// Suggest results will only be shown, when the user has typed more than the minimum characters prop in the search field
const showSuggest = computed(() => typingQuery.value.length >= props.minCharacters && !isResultPage.value);

// Redirect to search result page when pressing enter
const handleEnter = () => {
    if (typingQuery.value.length >= 1) {
        trackSearch();
        navigateTo(`/search?search=${typingQuery.value}`);
    }

    if (isResultPage.value) {
        emit('closeSearch');
    }
};

const onClickProduct = (product: Schemas['Product']) => {
    trackSelectItem(product, { id: 'search-suggest', name: 'search-suggest' });
    emit('closeSearch');
};

onMounted(() => {
    // Get the input from the ref (need querySelector since the ref returns the FormKit wrapper and not the input itself)
    const searchInput = document.querySelector('#searchInput') as null|HTMLInputElement;
    searchInput?.focus();

    // If on result page, set the search input to the last valid search term when opening it
    if (isResultPage.value && searchInput) {
        const searchValue = route.query.search as null|string;
        searchInput.textContent = searchStore.lastValidSearchTerm !== '' ? searchStore.lastValidSearchTerm : searchValue ?? '';
    }
});
</script>

<template>
    <div class="fixed w-full border-b border-gray-medium bg-white">
        <div class="container flex gap-4 py-4">
            <FormKit
                id="searchInput"
                v-model="typingQuery"
                type="text"
                prefix-icon="search"
                :floating-label="false"
                :classes="{
                    inner: 'focus-within:ring-[0] focus-within:border-0 shadow-none border-0 gap-4 p-[0]',
                    outer: 'w-full',
                    input: 'border-b border-gray-medium py-1',
                }"
                :placeholder="$t('search.searchBar.placeholder')"
                @keyup.enter="
                    () => {
                        handleEnter();
                        isResultPage = true;
                    }
                "
            />
        </div>

        <div
            v-if="showSuggest"
            class="z-1 container fixed inset-x-0 rounded-b-md border-t border-gray-medium bg-white p-0 shadow-md"
        >
            <LocaleLink
                v-for="product in getProducts?.slice(0, displayTotal)"
                :key="product.id"
                :to="getProductRoute(product)"
                @click="onClickProduct(product)"
            >
                <LayoutHeaderSearchSuggestions :product="product" />
            </LocaleLink>

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
                    <LocaleLink
                        v-if="getTotal > 0"
                        :to="'/search?search=' + typingQuery"
                        class="block w-full py-3"
                        @click="isResultPage = true"
                    >
                        <template v-if="getTotal > 1">
                            <span>{{ $t('search.searchBar.resultsLinkLabel', { number: getTotal }) }}</span>
                        </template>

                        <template v-else>
                            <span>{{ $t('search.searchBar.oneResultLinkLabel') }}</span>
                        </template>
                    </LocaleLink>

                    <div
                        v-else
                        class="py-3"
                    >
                        {{ $t('search.searchBar.noResultsLabel') }}
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
