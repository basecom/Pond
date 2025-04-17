<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  navigationElements?: Schemas['Category'][];
}>();
</script>

<template>
    <slot name="header">
        <header class="sticky top-0 z-30 h-fit bg-white shadow">
            <div class="container relative py-3">
                <slot name="wrapper">
                    <div class="flex items-center justify-between gap-4 md:grid md:grid-cols-[80%_auto]">
                        <div class="flex items-center gap-2">
                            <slot name="navigation-mobile">
                                <LayoutHeaderNavigationMobile :navigation-elements="navigationElements" />
                            </slot>

                            <slot name="logo">
                                <LayoutLogo :logo-classes="{ 'w-6 h-6 min-w-6': true }" />
                            </slot>

                            <slot name="navigation-desktop">
                                <LayoutHeaderNavigation :navigation-elements="navigationElements" />
                            </slot>
                        </div>

                        <slot name="actions">
                            <LayoutHeaderActions />
                        </slot>
                    </div>
                </slot>
            </div>
        </header>
    </slot>
</template>
