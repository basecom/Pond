<script setup lang="ts">
import type { CmsElementVimeoVideo } from '@shopware-pwa/composables-next';
import Player from '@vimeo/player';

const props = defineProps<{
    element: CmsElementVimeoVideo;
}>();

const vimeoVideo = ref(null);

onMounted(() => {
    if (vimeoVideo.value) {
        const config = useCmsElementConfig(props.element);
        const videoID = config.getConfigValue('videoID');
        new Player('vimeo-video', {
            id: parseInt(videoID),
            width: vimeoVideo.value?.offsetWidth ?? null,
        });
    }
});
</script>

<template>
    <div ref="vimeoVideo">
        <div id="vimeo-video" />
    </div>
</template>
