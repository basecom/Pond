<script setup lang="ts">
const props = defineProps<{
    element: CmsElementForm;
}>();

const config = useCmsElementConfig(props.element);
const type = config.getConfigValue('type');
</script>

<template>
    <template v-if="type === 'newsletter'">
        <CmsElementFormNewsletter :element="element" />
    </template>

    <template v-else>
        <!-- TODO: BUS-950 -->
    </template>
</template>
