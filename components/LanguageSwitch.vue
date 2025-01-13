<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
const { entityArrayToOptions } = useFormkitHelper();

const { locale, setLocale } = useI18n();
const { languages, getAvailableLanguages, changeLanguage, getLanguageCodeFromId, getLanguageIdFromCode } =
    useInternationalization();
const { refreshSessionContext } = useSessionContext();
await getAvailableLanguages();

const selectedLanguageId = computed(() => getLanguageIdFromCode(locale.value));

const onLanguageChange = async (option: Event) => {
    const selectedOptionId = (option.target as HTMLSelectElement).value;
    await changeLanguage(selectedOptionId);
    setLocale(getLanguageCodeFromId(selectedOptionId));
    await refreshSessionContext();
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
