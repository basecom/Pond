<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

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
