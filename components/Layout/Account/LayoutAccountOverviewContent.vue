<script setup lang="ts">
const customerStore = useCustomerStore();
</script>

<template>
    <div v-if="customerStore.customer"
        class="grid grid-cols-1 gap-6 lg:grid-cols-2 col-span-2">
        <div class="bg-white p-4 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold mb-2">Personal Information</h3>
            <p><strong>Name:</strong> {{ customerStore.customer.firstName }} {{ customerStore.customer.lastName }}</p>
            <p><strong>Email:</strong> {{ customerStore.customer.email }}</p>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold mb-2">Payment Method</h3>
            <p><strong>Name:</strong> {{ customerStore.customer.defaultPaymentMethod.name }}</p>
            <p><strong>Description:</strong> {{ customerStore.customer.defaultPaymentMethod.description }}</p>
        </div>
    </div>
    <div v-if="customerStore.customer"
         class="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-2 col-span-2">
        <div class="bg-white p-4 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold mb-2">Billing Address</h3>
            <p>{{ customerStore.customer.defaultBillingAddress.street }}</p>
            <p>{{ customerStore.customer.defaultBillingAddress.zipcode }} {{ customerStore.customer.defaultBillingAddress.city }}</p>
            <p>{{ customerStore.customer.defaultBillingAddress.country.name }}</p>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold mb-2">Shipping Address</h3>
            <p>{{ customerStore.customer.defaultShippingAddress.street }}</p>
            <p>{{ customerStore.customer.defaultShippingAddress.zipcode }} {{ customerStore.customer.defaultShippingAddress.city }}</p>
            <p>{{ customerStore.customer.defaultShippingAddress.country.name }}</p>
        </div>
    </div>
</template>

<style scoped>

</style>