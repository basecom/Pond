<script setup lang="ts">
const customerStore = useCustomerStore();

const props = defineProps<{
    isInHeader: boolean;
}>();

const { t } = useI18n();

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
    { path: '/account', label: t('account.overview.heading') },
    { path: '/account/profile', label: t('account.profile.heading') },
    { path: '/account/address', label: t('account.address.heading') },
    { path: '/account/payment', label: t('account.payment.heading') },
    { path: '/account/orders', label: t('account.orders.heading') },
]);
</script>

<template>
    <ul>
        <div
            v-if="customerStore.customer && !props.isInHeader"
            class="text-2xl font-bold"
        >
            {{
                $t('account.greeting', {
                    firstname: customerStore.customer.firstName,
                    lastname: customerStore.customer.lastName,
                })
            }}
        </div>

        <div
            v-if="props.isInHeader"
            class="mt-4 pb-4 pl-2 text-2xl font-bold"
        >
            {{ $t('account.dropdownHeading') }}
        </div>
        <li
            v-for="(item, index) in navItems"
            :key="item.path"
            class="mt-4 pb-4 pl-2"
            :class="{ 'border-b border-gray': index !== navItems.length - 1 }"
        >
            <LocaleLink
                :to="item.path"
                class="text-lg"
                :class="{ 'font-bold': isActive(item.path, true) }"
            >
                {{ item.label }}
            </LocaleLink>
        </li>
        <li>
            <FormKit
                type="submit"
                prefix-icon="right-from-bracket"
                @click.prevent="handleLogout"
            >
                {{ $t('account.logout.buttonLabel') }}
            </FormKit>
        </li>
    </ul>
</template>
