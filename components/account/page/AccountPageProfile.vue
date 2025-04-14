<script setup lang="ts">
const customerStore = useCustomerStore();
const { updateEmail, updatePersonalInfo } = useUser();
const { customer } = storeToRefs(customerStore);

const doUpdateEmail = async (mailData: any) => {
    try {
        await updateEmail(mailData);
    } catch (error) {

    }
};

</script>

<template>
    <AccountPageProfileInner
        v-if="customer"
        :customer="customer"
        @update-personal-data="(personalData: any) => updatePersonalInfo(personalData)"
    />
</template>
