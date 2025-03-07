<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
const { entityArrayToOptions } = useFormkitHelper();

const { locale, setLocale } = useI18n();
const { languages, changeLanguage, getLanguageCodeFromId, getLanguageIdFromCode } = useInternationalization();
const { refreshSessionContext } = useSessionContext();
const customerStore = useCustomerStore();
const { loading } = storeToRefs(customerStore);
const { getSeoUrlByNavigationId, isCustomRoute } = useSeoUrl();
const { getLocalePathPrefix } = useLocale();
const router = useRouter();

const selectedLanguageId = computed(() => getLanguageIdFromCode(locale.value));

const onLanguageChange = async (option: Event) => {
    const selectedOptionId = (option.target as HTMLSelectElement).value;
    loading.value = true;
    await changeLanguage(selectedOptionId);
    const languageCode = getLanguageCodeFromId(selectedOptionId);
    if(isCustomRoute.value) {
        const seoUrl = await getSeoUrlByNavigationId();
        await router.replace(
            `${getLocalePathPrefix(languageCode)}/${seoUrl}`,
        );
    } else {
        await setLocale(languageCode);
    }
    await refreshSessionContext();
    loading.value = false;
};

const languageOptions = computed(() => entityArrayToOptions<Schemas['Language']>(languages.value, 'name', true) ?? []);
</script>

<template>
    <FormKit
        v-if="languages && languages.length > 1"
        v-model="selectedLanguageId"
        type="select"
        name="language"
        prefix-icon="globe"
        :options="languageOptions"
        @change="onLanguageChange"
    />
</template>
