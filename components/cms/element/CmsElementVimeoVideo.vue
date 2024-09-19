<script setup lang="ts">
import type { CmsElementVimeoVideo } from '@shopware-pwa/composables-next';
import Player from '@vimeo/player';

const props = defineProps<{
    element: CmsElementVimeoVideo;
}>();

const vimeoVideo = ref(null);

onMounted(() => {
    if (vimeoVideo.value) {
        const player = new Player('vimeo-video', {
            id: parseInt(props.element.config.videoID.value),
            width: vimeoVideo.value?.offsetWidth ?? null,
        });
        player.on('play', function () {
        });
    }
});
</script>

<template>
    <div ref="vimeoVideo">
        <div id="vimeo-video"></div>
    </div>
</template>
