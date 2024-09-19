<script setup lang="ts">
const props = defineProps<{
    coverId: any;
}>();

const { getProductCover } = useMedia();
const cover = getProductCover(props.coverId);
</script>

<template>
    <img v-if="cover"
        :src="cover.url"
        :alt="cover.alt"
        class=""
    />
</template>

<style scoped>

</style>