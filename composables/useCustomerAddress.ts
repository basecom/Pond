import type { FormkitFields } from '~/types/formkit';

export function useCustomerAddress() {
    const { pushSuccess, pushError } = useNotifications();
    const { t } = useI18n();

    const {
        customerAddresses,
        loadCustomerAddresses,
        createCustomerAddress,
        updateCustomerAddress,
        deleteCustomerAddress,
        setDefaultCustomerShippingAddress,
        setDefaultCustomerBillingAddress,
    } = useAddress();

    const { customer } = storeToRefs(useCustomerStore());

    const activeShippingAddress = computed(() => customer.value?.activeShippingAddress);
    const activeBillingAddress = computed(() => customer.value?.activeBillingAddress);

    const syncBillingAddress = async (sameBillingAddress: boolean, shippingId: string, billingId: string) => {
        if (sameBillingAddress && shippingId !== billingId) {
            try {
                await setDefaultCustomerBillingAddress(shippingId);
                pushSuccess(t('account.address.updateBillingSuccess'));
            } catch (error) {
                pushError(t('account.address.updateBillingError'));
            }
        }
    };

    const changeDefaultAddress = async (
        addressType: 'shippingAddress' | 'billingAddress',
        newAddressId: string,
        shouldSyncBillingAddress: boolean,
    ) => {
        try {
            if (addressType === 'shippingAddress' && newAddressId !== activeShippingAddress.value.id) {
                await setDefaultCustomerShippingAddress(newAddressId);
                await syncBillingAddress(shouldSyncBillingAddress, newAddressId, activeBillingAddress.value.id);
                pushSuccess(t('account.address.updateShippingSuccess'));
            }

            if (addressType === 'billingAddress' && newAddressId !== activeBillingAddress.value.id) {
                await setDefaultCustomerBillingAddress(newAddressId);
                pushSuccess(t('account.address.updateBillingSuccess'));
            }
        } catch (error) {
            if (addressType === 'shippingAddress') {
                pushError(t('account.address.updateShippingError'));
                return;
            }

            pushError(t('account.address.updateBillingError'));
        }
    };

    const saveAddress = async (newAddressId: string, addressData: FormkitFields) => {
        if (newAddressId !== '') {
            return await updateAddress(addressData, newAddressId);
        }

        if (newAddressId === '') {
            return await createAddress(addressData);
        }
    };

    const updateAddress = async (addressData: FormkitFields, id: string) => {
        try {
            const savedAddress = await updateCustomerAddress({
                ...addressData,
                id: id,
            });
            pushSuccess(t('account.address.editSuccess'));
            return savedAddress;
        } catch (error) {
            pushSuccess(t('account.address.editError'));
        }
    };

    const createAddress = async (addressData: FormkitFields) => {
        try {
            const savedAddress = await createCustomerAddress(addressData);
            pushSuccess(t('account.address.createSuccess'));
            return savedAddress;
        } catch (error) {
            pushSuccess(t('account.address.createError'));
        }
    };

    const deleteAddress = async (addressId: string) => {
        try {
            await deleteCustomerAddress(addressId);
            await loadCustomerAddresses();
            pushSuccess(t('account.address.deleteSuccess'));
        } catch (e) {
            pushError(t('account.address.deleteError'));
        }
    };

    return {
        customerAddresses,
        loadCustomerAddresses,
        activeShippingAddress,
        activeBillingAddress,
        syncBillingAddress,
        changeDefaultAddress,
        saveAddress,
        deleteAddress,
    };
}
