<script setup lang="ts"></script>

<template>
    <div class="container mt-4 flex w-full">
        <AccountSideNavigation
            class="mr-32 hidden w-1/4 lg:block"
            :is-in-header="false"
        />

        <div class="flex-grow lg:w-3/4">
            <slot />
        </div>
    </div>
</template>
