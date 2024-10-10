<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    address: Schemas['CustomerAddress'];
}>();

const customerStore = useCustomerStore();
const { setDefaultCustomerBillingAddress, setDefaultCustomerShippingAddress } = useAddress();

defineEmits<{
    edit: [address: Schemas['CustomerAddress']];
    delete: [address: Schemas['CustomerAddress']['id']];
}>();

const updateDefaultShipping = async () => {
    try {
        await setDefaultCustomerShippingAddress(props.address.id);
        customerStore.refreshContext();
    } catch (e) {
        console.log(e);
    }
};

const updateDefaultBilling = async () => {
    try {
        await setDefaultCustomerBillingAddress(props.address.id);
        customerStore.refreshContext();
    } catch (e) {
        console.log(e);
    }
};
</script>

<template>
    <div class="rounded-lg bg-white p-4 shadow">
        <div class="relative mb-2 flex h-8 flex-col justify-between">
            <UtilityPill
                v-if="address.id === customerStore.customer.defaultBillingAddressId"
                :content="'default billing'"
            />
            <UtilityPill
                v-if="address.id === customerStore.customer.defaultShippingAddressId"
                :content="'default shipping'"
            />

            <div
                v-if="
                    address.id != customerStore.customer.defaultBillingAddressId ||
                    address.id != customerStore.customer.defaultShippingAddressId
                "
                class="absolute right-0 top-0"
            >
                <LazySharedPopover>
                    <template #trigger>
                        <FormKitIcon
                            icon="ellipsis-vertical"
                            class="h-4 w-4"
                        />
                    </template>
                    <template #content>
                        <button
                            v-if="address.id != customerStore.customer.defaultBillingAddressId"
                            @click="updateDefaultBilling"
                        >
                            {{ $t('account.address.updateBilling') }}
                        </button>
                        <button
                            v-if="address.id != customerStore.customer.defaultShippingAddressId"
                            @click="updateDefaultShipping"
                        >
                            {{ $t('account.address.updateShipping') }}
                        </button>
                    </template>
                </LazySharedPopover>
            </div>
        </div>
        <p>
            <span class="font-semibold"> {{ address.firstName }} {{ address.lastName }} </span><br />
            <span v-if="address.company"> {{ address.company }} </span><br />
            <span> {{ address.street }} </span><br />
            <span> {{ address.zipcode }} {{ address.city }} </span><br />
            <span> {{ address.country.translated.name }} </span><br />
            <span v-if="address.phoneNumber">
                {{ address.phoneNumber }}
            </span>
        </p>

        <div class="mt-2">
            <button
                class="rounded bg-brand-primary px-2 py-1 text-white"
                @click="() => $emit('edit', address)"
            >
                {{ $t('account.address.edit') }}
            </button>
            <button
                v-if="
                    address.id != customerStore.customer.defaultBillingAddressId &&
                    address.id != customerStore.customer.defaultShippingAddressId
                "
                class="ml-2 rounded bg-status-danger px-2 py-1 text-white"
                @click="() => $emit('delete', address.id)"
            >
                {{ $t('account.address.delete') }}
            </button>
        </div>
    </div>
</template>
