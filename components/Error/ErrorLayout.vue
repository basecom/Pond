<template>
  <LayoutHeader />
  <slot name="error"></slot>
</template>
<script>
import {defineComponent} from "vue";
import NotFoundError from "./NotFoundError.vue";

export default defineComponent({
  components: {NotFoundError}
})
</script>