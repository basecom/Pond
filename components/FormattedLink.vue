<script lang="ts">
/**
 * # Formatted Link
 *
 * Wraps the `<NuxtLink>` component, optionally (by default) formatting links with the current locale.
 *
 * `<FormattedLink>` is a drop-in replacement for Nuxt's `<NuxtLink>`, Vue Router's `<RouterLink>`, and HTML's `<a>` tag.
 */
export default {};
</script>

<script setup lang="ts">
const localePath = useLocalePath();
const { formatLink } = useInternationalization(localePath);

const props = withDefaults(
    defineProps<{
        to: string | RouteObject,
        format?: boolean
    }>(),
    {
        format: true,
    },
);

const getLink = computed(() => props.format ? formatLink(props.to) : props.to);
</script>

<template>
    <NuxtLink
        v-bind="$attrs"
        :to="getLink"
    >
        <slot></slot>
    </NuxtLink>
</template>