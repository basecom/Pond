<script setup lang="ts">
import type { CmsElementVimeoVideo } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementVimeoVideo;
}>();

const youtubeVideo = ref(null);

const videoId = props.element.config.videoID.value
const videoUrl = computed(() => `https://www.youtube.com/embed/${videoId}`)
</script>

<template>
    <div ref="youtubeVideo" class="my-0 mx-auto">
        <div class="youtube-player h-full w-full relative ">
            <iframe
                :src="videoUrl"
                frameborder="0"
                class="w-full h-full absolute top-0 left-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowfullscreen
            ></iframe>
        </div>
    </div>
</template>

<style scoped>
.youtube-player{
    padding-bottom: 56.25%;
}
</style>
