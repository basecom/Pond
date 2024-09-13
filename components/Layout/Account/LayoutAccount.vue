<script setup lang="ts">

</script>

<template>
    <div class="container flex w-full">
        <AccountSideNavigation class="mr-32 hidden lg:block" :is-in-header="false" />

        <div class="flex-grow">
            <slot/>
        </div>
    </div>
</template>


