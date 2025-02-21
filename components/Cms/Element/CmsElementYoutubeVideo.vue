<script setup lang="ts">
import type { CmsElementVimeoVideo } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementVimeoVideo;
}>();

const youtubeVideo = ref(null);

const config = useCmsElementConfig(props.element);
const videoID = config.getConfigValue('videoID');
const videoUrl = computed(() => `https://www.youtube.com/embed/${videoID}`);
</script>

<template>
    <div
        ref="youtubeVideo"
        class="youtube-player relative mx-auto my-0 size-full"
    >
        <iframe
            :src="videoUrl"
            frameborder="0"
            class="absolute left-0 top-0 size-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowfullscreen
        />
    </div>
</template>

<style scoped>
.youtube-player {
    padding-bottom: 56.25%;
}
</style>
