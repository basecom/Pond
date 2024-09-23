<script setup lang="ts">

const {
   customerAddresses,
   loadCustomerAddresses,
   createCustomerAddress,
   updateCustomerAddress,
   deleteCustomerAddress,
   setDefaultCustomerBillingAddress,
   setDefaultCustomerShippingAddress,
   errorMessageBuilder,
} = useAddress();

const loading = ref(true);
const selectedAddress = ref(null);
const showModal = ref(false);
const error = ref(null);
const isEditMode = ref(false);

await loadCustomerAddresses();
loading.value = false;

const openEditModal = (address) => {
    selectedAddress.value = { ...address };
    console.log('selectedAddress edit modal',selectedAddress.value)
    showModal.value = true;
    isEditMode.value = true;
};

const openCreateModal = () => {
    selectedAddress.value = {
        firstName: '',
        lastName: '',
        street: '',
        zipcode: '',
        city: '',
        country: { translated: { name: '' } }
    };
    isEditMode.value = false;
    showModal.value = true;
};

const saveAddress = async () => {
    try {
        console.log('selectedAddress', selectedAddress.value);
        console.log('isEditMode', isEditMode.value);

        if (isEditMode.value) {
            await updateCustomerAddress(selectedAddress.value);
            await loadCustomerAddresses();
            showModal.value = false;
            return;
        }

        await createCustomerAddress(selectedAddress.value);
        await loadCustomerAddresses();
        showModal.value = false;
    } catch (e) {
        error.value = "Upps an error occurred. Please try again.";
    }
};

const deleteAddress = async (addressId) => {
    try{
        await deleteCustomerAddress(addressId);
        await loadCustomerAddresses();
    }  catch (e) {
        error.value = "Fehler beim Löschen der Adresse";
    }
}
</script>

<template>
    <h1 class="mb-2 font-bold">Your Addresses</h1>
    <button @click="openCreateModal" class="bg-brand-primary mt-4 text-white py-1 px-2 rounded mb-4">
        Add new address
    </button>
            <div v-if="customerAddresses.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="address in customerAddresses" :key="address.id" class="bg-white rounded-lg shadow p-4">
                    <p class="font-semibold">{{ address.firstName }} {{ address.lastName }}</p>
                    <p v-if="address.company">{{ address.company }}</p>
                    <p>{{ address.street }}</p>
                    <p>{{ address.zipcode }} {{ address.city }}</p>
                    <p>{{ address.country.translated.name }}</p>
                    <p v-if="address.phoneNumber">{{ address.phoneNumber }}</p>

                    <div class="mt-2">
                        <button @click="openEditModal(address)" class="bg-brand-primary text-white py-1 px-2 rounded">
                            edit
                        </button>
                        <button @click="deleteAddress(address.id)" class="bg-status-danger text-white py-1 px-2 rounded ml-2">
                            delete
                        </button>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>No addresses found.</p>
            </div>

            <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div class="bg-white p-6 rounded-lg shadow-lg  lg:w-96">
                    <h3 class="text-lg font-semibold mb-4">{{ isEditMode ? 'Edit address' : 'Add address'}}</h3>

                    <div class="mb-2">
                        <label for="firstname" class="block font-medium">First Name</label>
                        <input v-model="selectedAddress.firstName" id="firstName" class="w-full p-2 border rounded" />
                    </div>
                    <div class="mb-2">
                        <label for="lastname" class="block font-medium">Last Name</label>
                        <input v-model="selectedAddress.lastName" id="lastName" class="w-full p-2 border rounded" />
                    </div>
                    <div class="mb-2">
                        <label for="street" class="block font-medium">Straße</label>
                        <input v-model="selectedAddress.street" id="street" class="w-full p-2 border rounded" />
                    </div>
                    <div class="mb-2">
                        <label for="zipcode" class="block font-medium">PLZ</label>
                        <input v-model="selectedAddress.zipcode" id="zipcode" class="w-full p-2 border rounded" />
                    </div>
                    <div class="mb-2">
                        <label for="city" class="block font-medium">Stadt</label>
                        <input v-model="selectedAddress.city" id="city" class="w-full p-2 border rounded" />
                    </div>

                    <div v-if="error" class="text-status-danger">{{ error }}</div>

                    <div class="mt-4 flex justify-end space-x-2">
                        <button @click="showModal = false" class="bg-gray-dark text-white py-1 px-3 rounded">Abbrechen</button>
                        <button @click="saveAddress" class="bg-brand-primary text-white py-1 px-3 rounded">Speichern</button>
                    </div>
                </div>
            </div>
</template>
