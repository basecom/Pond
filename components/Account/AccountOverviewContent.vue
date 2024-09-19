<script setup lang="ts">
const customerStore = useCustomerStore();
const { isNewsletterSubscriber, newsletterSubscribe, newsletterUnsubscribe, getNewsletterStatus } = useNewsletter();

onMounted(() => {
    getNewsletterStatus();
});

const handleNewsletterChange = async (event: Event) => {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
        await newsletterSubscribe({
            email: customerStore.customer.email,
            option: 'subscribe',
        });
    } else {
        await newsletterUnsubscribe(customerStore.customer.email);
    }
};
</script>

<template>
    <h1 class="mb-2 font-bold">Overview</h1>
    <div class="mb-4 text-base">
        Directly access your profile information, the default payment method and given addresses.
    </div>

    <div
        v-if="customerStore.customer"
        class="col-span-2 grid grid-cols-1 gap-6 lg:grid-cols-2"
    >
        <div class="rounded-lg bg-white p-4 shadow-md">
            <h3 class="mb-2 text-lg font-semibold">Personal Information</h3>
            <p><strong>Name:</strong> {{ customerStore.customer.firstName }} {{ customerStore.customer.lastName }}</p>
            <p><strong>Email:</strong> {{ customerStore.customer.email }}</p>
        </div>

        <div class="rounded-lg bg-white p-4 shadow-md">
            <h3 class="mb-2 text-lg font-semibold">Payment Method</h3>
            <p><strong>Name:</strong> {{ customerStore.customer.defaultPaymentMethod.name }}</p>
            <p><strong>Description:</strong> {{ customerStore.customer.defaultPaymentMethod.description }}</p>
        </div>
    </div>

    <div
        v-if="customerStore.customer"
        class="col-span-2 mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2"
    >
        <div class="rounded-lg bg-white p-4 shadow-md">
            <h3 class="mb-2 text-lg font-semibold">Billing Address</h3>
            <p>{{ customerStore.customer.defaultBillingAddress.street }}</p>
            <p>
                {{ customerStore.customer.defaultBillingAddress.zipcode }}
                {{ customerStore.customer.defaultBillingAddress.city }}
            </p>
            <p>{{ customerStore.customer.defaultBillingAddress.country.name }}</p>
        </div>

        <div class="rounded-lg bg-white p-4 shadow-md">
            <h3 class="mb-2 text-lg font-semibold">Shipping Address</h3>
            <p>{{ customerStore.customer.defaultShippingAddress.street }}</p>
            <p>
                {{ customerStore.customer.defaultShippingAddress.zipcode }}
                {{ customerStore.customer.defaultShippingAddress.city }}
            </p>
            <p>{{ customerStore.customer.defaultShippingAddress.country.name }}</p>
        </div>
    </div>

    <div
        v-if="customerStore.customer"
        class="mt-4 rounded-lg bg-white p-4 shadow-md"
    >
        <h3 class="mb-2 text-lg font-semibold">Newsletter Subscription</h3>
        <label>
            <input
                type="checkbox"
                :checked="isNewsletterSubscriber"
                @change="handleNewsletterChange"
            />
            Yes, I would like to subscribe to the free Demostore newsletter. (I may unsubscribe at any time.)
        </label>
    </div>
</template>
