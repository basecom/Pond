<script setup lang="ts">
import type { CmsElementVimeoVideo } from '@shopware-pwa/composables-next';
// it's an import, therefore we ignore that it has an any type
// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-ignore
import Player from '@vimeo/player';

const props = defineProps<{
    element: CmsElementVimeoVideo;
}>();

const vimeoVideo: Ref<HTMLElement | null> = ref(null);

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
