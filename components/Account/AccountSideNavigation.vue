<script setup lang="ts">
import { ref } from 'vue';

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
    { path: '/account/address', label: 'address' },
    { path: '/account/payment', label: 'Payment methods' },
    { path: '/account/orders', label: 'Orders' }
]);
</script>

<template>
    <ul>
        <div v-if="customerStore.customer &&  !props.isInHeader"
             class="font-bold text-2xl">
            Hallo {{ customerStore.customer.firstName }} {{ customerStore.customer.lastName }}
        </div>

        <div v-if="props.isInHeader"
             class="font-bold text-2xl mt-4 ml-4 pb-4 pl-2">
            Your account
        </div>
        <li
            v-for="(item, index) in navItems"
            :key="item.path"
            class="mt-4 ml-4 pb-4 pl-2"
            :class="{'border-b border-gray-300' : index !== navItems.length-1}"
        >
            <NuxtLink
                :to="item.path"
                class="text-lg"
                :class="{ 'font-bold': isActive(item.path,true) }"
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

<style scoped>

</style>
