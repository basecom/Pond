<script setup lang="ts">
import type { CmsElementManufacturerLogo } from '@shopware-pwa/composables-next';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    element: CmsElementManufacturerLogo;
}>();

const { manufacturer } = props.element.data;
// TBD: manufacturer image can be shown and the text/image can be a link, but shopware does not delivery the information
// this seems to be an issue with the DataResolver and that should be investigated before creating a workaround here
</script>

<template>
    <div
        v-if="manufacturer"
        class="text-gray"
    >
        {{ getTranslatedProperty(manufacturer, 'name') }}
    </div>
</template>
