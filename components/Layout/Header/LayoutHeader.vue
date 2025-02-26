<script setup lang="ts">

</script>

<template>
    <header class="sticky top-0 z-30 h-fit bg-white shadow">
        <div class="container relative py-3">
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-3">
                    <LayoutLogo :logo-classes="{ 'w-6 h-6': true }" />
                </div>

                <LayoutHeaderActions />
            </div>
        </div>

        <div id="flyouts" />
    </header>
</template>
