<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
const { entityArrayToOptions } = useFormkitHelper();

const { languages, getAvailableLanguages, changeLanguage } = useInternationalization();
const { languageIdChain } = useSessionContext();
await getAvailableLanguages();

const onLanguageChange = async (option: Event) => {
    const data = await changeLanguage((option.target as HTMLSelectElement).value);
    if (data.redirectUrl) {
        window.location.replace(data.redirectUrl);
    } else {
        window.location.reload();
    }
};

const languageOptions = computed(() => entityArrayToOptions<Schemas['language']>(languages.value, 'name', true) ?? []);
</script>

<template>
    <FormKit
        v-if="languages && languages.length > 1"
        v-model="languageIdChain"
        type="select"
        id="languageSwitch"
        name="language"
        prefix-icon="globe"
        :options="languageOptions"
        @change="onLanguageChange"
    />
</template>
