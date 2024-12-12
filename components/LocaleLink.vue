<script lang="ts">
/**
 * # Locale Link
 *
 * Wraps the `<NuxtLink>` component, optionally (by default) formatting links with the current locale prefix.
 *
 * `<LocaleLink>` is a drop-in replacement for Nuxt's `<NuxtLink>`, Vue Router's `<RouterLink>`, and HTML's `<a>` tag.
 *
 * @example
 * // If the current locale requires a prefix, links to {domain}/{prefix}/products
 * // Otherwise, links to {domain}/products
 * <LocaleLink to="/products"></LocaleLink>
 * @example
 * // Link localization can be disabled (e.g. for external links). In this case, the link is not changed in any way.
 * <LocaleLink to="https://www.google.com/" :format="false"></LocaleLink>
 */
export default {};
</script>

<script setup lang="ts">
const localePath = useLocalePath();
const { formatLink } = useInternationalization(localePath);

const props = withDefaults(
    defineProps<{
        to: string | RouteObject;
        format?: boolean;
    }>(),
    {
        format: true,
    },
);

const getLink = computed(() => (props.format ? formatLink(props.to) : props.to));
</script>

<template>
    <NuxtLink
        v-bind="$attrs"
        :to="getLink"
    >
        <slot></slot>
    </NuxtLink>
</template>
