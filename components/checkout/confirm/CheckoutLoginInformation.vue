<script setup lang="ts">
const customerStore = useCustomerStore();
</script>

<template>
    <fieldset class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6">
        <legend class="pt-5">
            <div class="font-bold">
                Personal Information
            </div>

            <template v-if="customerStore.customer">
                <span class="text-sm">
                    You are logged in as {{ customerStore.customer.firstName }} {{ customerStore.customer.lastName }}
                </span>
            </template>

            <template v-else>
                <!-- TODO: login / register formular (BUS-801) -->
                not logged in
            </template>
        </legend>
    </fieldset>
</template>
