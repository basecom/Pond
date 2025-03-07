<script setup lang="ts">
const props = defineProps<{
  navigationId: string;
}>();

const { getLandingPage } = usePondGetEntities();
const { t } = useI18n();

const landingPage = await getLandingPage(props.navigationId);
if (!landingPage?.value) {
    throw createError({ statusCode: 404, message: t('error.404.detail') });
}
</script>

<template>
    <CmsPage
        v-if="landingPage?.cmsPage"
        :cms-page="landingPage.cmsPage"
    />
</template>
