<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CmsBlockLoader from '~/components/cms/CmsBlockLoader.vue';

defineProps<{
    section: Schemas['CmsSection'];
}>();
</script>

<template>
    <div>
        <template
            v-for="block in section.blocks"
            :key="block.id"
        >
            <CmsBlockLoader :block="block" />
        </template>
    </div>
</template>
