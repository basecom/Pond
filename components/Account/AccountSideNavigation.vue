<script setup lang="ts">
const customerStore = useCustomerStore();

const props = defineProps<{
    isInHeader: boolean;
}>();

const handleLogout = async () => {
    await customerStore.logout();
    navigateTo('/');
};

const isActive = (path: string, onlyExactMatch: boolean = false) => {
    if (!path) return false;
    const { path: currentPath } = useRoute();
    return onlyExactMatch ? path === currentPath : currentPath.includes(path);
};

const navItems = ref([
    { path: '/account', label: 'Overview' },
    { path: '/account/profile', label: 'Your profile' },
    { path: '/account/address', label: 'Address' },
    { path: '/account/payment', label: 'Payment methods' },
    { path: '/account/orders', label: 'Orders' },
]);
</script>

<template>
    <ul>
        <div
            v-if="customerStore.customer && !props.isInHeader"
            class="text-2xl font-bold"
        >
            Hallo {{ customerStore.customer.firstName }} {{ customerStore.customer.lastName }}
        </div>

        <div
            v-if="props.isInHeader"
            class="ml-4 mt-4 pb-4 pl-2 text-2xl font-bold"
        >
            Your account
        </div>
        <li
            v-for="(item, index) in navItems"
            :key="item.path"
            class="ml-4 mt-4 pb-4 pl-2"
            :class="{ 'border-gray-300 border-b': index !== navItems.length - 1 }"
        >
            <NuxtLink
                :to="item.path"
                class="text-lg"
                :class="{ 'font-bold': isActive(item.path, true) }"
            >
                {{ item.label }}
            </NuxtLink>
        </li>
        <li>
            <FormKit
                type="submit"
                prefix-icon="right-from-bracket"
                @click.prevent="handleLogout"
            >
                logout
            </FormKit>
        </li>
    </ul>
</template>
