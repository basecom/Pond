<script setup lang="ts">
const customerStore = useCustomerStore();
const { customer } = storeToRefs(customerStore);
const { isNewsletterSubscriber, newsletterSubscribe, newsletterUnsubscribe, getNewsletterStatus } = useNewsletter();
const billingAddress = computed(() => customer.value.defaultBillingAddress);
const shippingAddress = computed(() => customer.value.defaultShippingAddress);
const paymentMethod = computed(() => customer.value.defaultPaymentMethod);

getNewsletterStatus();

const handleNewsletterChange = async (event: Event) => {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
        await newsletterSubscribe({
            email: customer.value.email,
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
            <p><strong>Name:</strong> {{ customer.firstName }} {{ customer.lastName }}</p>
            <p><strong>Email:</strong> {{ customer.email }}</p>
        </div>

        <div class="rounded-lg bg-white p-4 shadow-md">
            <h3 class="mb-2 text-lg font-semibold">Payment Method</h3>
            <p><strong>Name:</strong> {{ paymentMethod.name }}</p>
            <p><strong>Description:</strong> {{ paymentMethod.description }}</p>
        </div>
    </div>

    <div
        v-if="customer"
        class="col-span-2 mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2"
    >
        <div class="rounded-lg bg-white p-4 shadow-md">
            <h3 class="mb-2 text-lg font-semibold">Billing Address</h3>
            <p>{{ billingAddress.street }}</p>
            <p>
                {{ billingAddress.zipcode }}
                {{ billingAddress.city }}
            </p>
            <p>{{ billingAddress.country.name }}</p>
        </div>

        <div class="rounded-lg bg-white p-4 shadow-md">
            <h3 class="mb-2 text-lg font-semibold">Shipping Address</h3>
            <p>{{ shippingAddress.street }}</p>
            <p>
                {{ shippingAddress.zipcode }}
                {{ shippingAddress.city }}
            </p>
            <p>{{ shippingAddress.country.name }}</p>
        </div>
    </div>

    <div
        v-if="customer"
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
