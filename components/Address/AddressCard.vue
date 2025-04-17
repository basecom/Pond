<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    address: Schemas['CustomerAddress'];
}>();

const customerStore = useCustomerStore();
const { setDefaultCustomerBillingAddress, setDefaultCustomerShippingAddress } = useAddress();
const { pushSuccess, pushError } = useNotifications();
const { t } = useI18n();

defineEmits<{
    edit: [address: Schemas['CustomerAddress']];
    delete: [address: Schemas['CustomerAddress']['id']];
}>();

const updateDefaultShipping = async () => {
    try {
        await setDefaultCustomerShippingAddress(props.address.id);
        await customerStore.refreshContext();
        pushSuccess(t('account.address.updateShippingSuccess'));
    } catch (e) {
        pushError(t('account.address.updateShippingError'));
    }
};

const updateDefaultBilling = async () => {
    try {
        await setDefaultCustomerBillingAddress(props.address.id);
        await customerStore.refreshContext();
        pushSuccess(t('account.address.updateBillingSuccess'));
    } catch (e) {
        pushError(t('account.address.updateBillingError'));
    }
};
</script>

<template>
    <div class="rounded-lg bg-white p-4 shadow">
        <div class="relative mb-2 flex h-11 flex-col justify-between">
            <UtilityBadge
                v-if="address.id === customerStore.customer.defaultBillingAddressId"
                :content="$t('account.address.defaultBilling')"
                type="success"
                size="sm"
            />

            <UtilityBadge
                v-if="address.id === customerStore.customer.defaultShippingAddressId"
                :content="$t('account.address.defaultShipping')"
                type="success"
                size="sm"
            />

            <div
                v-if="
                    address.id != customerStore.customer.defaultBillingAddressId ||
                        address.id != customerStore.customer.defaultShippingAddressId
                "
                class="absolute right-0 top-0 z-10"
            >
                <LazySharedPopover>
                    <template #trigger>
                        <FormKitIcon
                            icon="ellipsis-vertical"
                            :title="t('icon.moreActions')"
                            class="size-4"
                        />
                    </template>

                    <template #content>
                        <FormKit
                            v-if="address.id != customerStore.customer.defaultBillingAddressId"
                            type="button"
                            :classes="{
                                outer: 'max-w-fit my-4',
                            }"
                            @click="updateDefaultBilling"
                        >
                            {{ $t('account.address.updateBilling') }}
                        </FormKit>

                        <FormKit
                            v-if="address.id != customerStore.customer.defaultShippingAddressId"
                            type="button"
                            :classes="{
                                outer: 'max-w-fit my-4',
                            }"
                            @click="updateDefaultShipping"
                        >
                            {{ $t('account.address.updateShipping') }}
                        </FormKit>
                    </template>
                </LazySharedPopover>
            </div>
        </div>

        <AddressData :address="address" />

        <div class="mt-2">
            <FormKit
                type="submit"
                @click="() => $emit('edit', address)"
            >
                {{ $t('global.edit') }}
            </FormKit>

            <FormKit
                v-if="
                    address.id != customerStore.customer.defaultBillingAddressId &&
                        address.id != customerStore.customer.defaultShippingAddressId
                "
                type="button"
                :classes="{
                    outer: 'mt-2',
                }"
                @click="() => $emit('delete', address.id)"
            >
                {{ $t('global.delete') }}
            </FormKit>
        </div>
    </div>
</template>
