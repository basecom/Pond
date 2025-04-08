<script setup lang="ts">
import {ApiClientError} from '@shopware/api-client';
import type {RegisterData} from "./AccountRegisterInner.vue";

const isLoading = ref(false);
const errorMessage: Ref<string | undefined> = ref(undefined);

const customerStore = useCustomerStore();
const {t} = useI18n();

function buildRegisterForm(registerData: RegisterData) {
    const address = {
        countryId: registerData.countryId,
        countryState: registerData.countryState ?? null,
        salutationId: registerData.salutationId,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        zipcode: registerData.zipcode ?? null,
        city: registerData.city,
        company: registerData.company ?? null,
        street: registerData.street,
        department: registerData.department ?? null,
        title: registerData.title ?? null,
        phoneNumber: registerData.phoneNumber ?? null,
        additionalAddressLine1: registerData.additionalAddressLine1 ?? null,
        additionalAddressLine2: registerData.additionalAddressLine2 ?? null,
    };

    return {
        email: registerData.email,
        password: registerData.password,
        salutationId: registerData.salutationId,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        billingAddress: address,
        shippingAddress: registerData.shippingAddress ?? address,
        birthdayDay: registerData.birthdate ? registerData.birthdate.getDay() : null,
        birthdayMonth: registerData.birthdate ? registerData.birthdate.getMonth() : null,
        birthdayYear: registerData.birthdate ? registerData.birthdate.getFullYear() : null,
        title: registerData.title ?? null,
        accountType: registerData.accountType ?? null,
        vatIds: registerData.vatNumber ?? null,
    }
}

const register = async (registerData: RegisterData) => {
    isLoading.value = true;
    errorMessage.value = undefined;

    try {
        const registerForm = buildRegisterForm(registerData);
        console.log(registerForm);
        await customerStore.register(registerForm);
        console.log('executing register');
    } catch (error) {
        if (error instanceof ApiClientError) {
            console.warn('API Error detected');
            console.warn('This is the error:', error)
            errorMessage.value = t(`error.${error.details.errors[0]?.code}`);
            return;
        }
    } finally {
        isLoading.value = false;
    }
};

</script>

<template>
    <AccountRegisterInner
        :is-loading="isLoading"
        :error-message="errorMessage"
        @register="(registerData: RegisterData) => register(registerData)"
    />
</template>
