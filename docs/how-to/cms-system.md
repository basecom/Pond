# CMS System

## Create Custom CMS

After creating the custom CMS block/element in the Shopware admin (documentation [here](https://developer.shopware.com/docs/guides/plugins/plugins/content/cms/add-cms-element.html)), we create the corresponding files in the frontend.

### Add block component
Go to `components/cms/block` and create a component. If the given name in the admin, for example, was `my-custom-component`, we will now create a component with the name `CmsBlockMyCustomComponent.vue`.

:::info If you are unsure about the name of your element, check the console. An error will be thrown that a certain element couldn't be found :::

````vue
<!-- components/cms/block/CmsBlockMyCustomComponent.vue -->
<script setup lang="ts">
  <script setup lang="ts">
  import type { Schemas } from '@shopware/api-client/api-types/storeApiTypes';

  const props = defineProps<{
    content: Schemas['CmsBlock'];
  }>();

  const { getSlotContent } = useCmsBlock(props.content);
  const image = getSlotContent('image');
  const text = getSlotContent('text');
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
      <CmsGenericElement :content="image" />
      <CmsGenericElement :content="text" />
  </div>
</template>
````

Remember that the parameter of the `getSlotContent` method must be the name of your defined slot name.

### Add element component
Go to `components/cms/element` and create a component. If the given name in the admin, for example, was `my-custom-component-element`, we will now create a component with the name `CmsElementMyCustomComponentElement.vue`.

:::info If you are unsure about the name of your element, check the console. An error will be thrown that a certain element couldn't be found :::

````vue
<!-- components/cms/element/CmsElementMyCustomComponentElement.vue -->
<script setup lang="ts">
  import type { Schemas } from '@shopware/api-client/api-types';
  
  const props = defineProps<{
    content: Schemas['CmsSlot'];
  }>();

  const { getConfigValue } = useCmsElementConfig(props.content);
  const config = getConfigValue('yourConfigKey');
</script>

<template>
  <div>
    {{ config }}
  </div>
</template>
````

Replace `yourConfigKey` with the key of your wanted configuration value.

## Replace whole CMS block/element

Check the [shopware documentation](https://frontends.shopware.com/getting-started/cms/customize-components.html) for further information