<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast';
import {ApiClientError} from '@shopware/api-client';
import type { ChangePasswordForm } from '~/components/account/page/AccountPageProfileChangePasswordInner.vue';
import type { ChangeMailForm } from '~/components/account/page/AccountPageProfileChangeMailInner.vue';
import type { PersonalDataForm } from '~/components/account/page/AccountPageProfileInner.vue';

const { t } = useI18n();
const customerStore = useCustomerStore();
const { updatePersonalInfo, updateEmail } = useUser();
const { updatePassword } = useCustomerPassword();
const { toast } = useToast();

const { customer } = storeToRefs(customerStore);

const doUpdatePersonalData = async (personalDataForm: PersonalDataForm) => {
    try {
        await updatePersonalInfo(personalDataForm);
        await customerStore.refreshContext();
        toast({
            title: t('account.personalProfile.status.changePersonalDataSuccessfully.title'),
            description: t('account.personalProfile.status.changePersonalDataSuccessfully.description'),
        });
    } catch (error) {
        if (error instanceof ApiClientError) {
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${ error.details.errors[0]?.code}`),
                variant: 'destructive',
            });
        }
    }
};

const doUpdateEmail = async (mailForm: ChangeMailForm) => {
    try {
        await updateEmail(mailForm);
        await customerStore.refreshContext();
        toast({
            title: t('account.personalProfile.status.changeMailSuccessfully.title'),
            description: t('account.personalProfile.status.changeMailSuccessfully.description'),
        });
    } catch (error) {
        if (error instanceof ApiClientError) {
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${ error.details.errors[0]?.code}`),
                variant: 'destructive',
            });
        }
    }
};

const doUpdatePassword = async (passwordForm: ChangePasswordForm) => {
    try {
        await updatePassword(passwordForm);
        toast({
            title: t('account.personalProfile.status.changePasswordSuccessfully.title'),
            description: t('account.personalProfile.status.changePasswordSuccessfully.description'),
        });
    } catch (error) {
        if (error instanceof ApiClientError) {
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${ error.details.errors[0]?.code}`),
                variant: 'destructive',
            });
        }
    }
};
</script>

<template>
    <AccountPageProfileInner
        v-if="customer"
        :customer="customer"
        @update-personal-data="(personalDataForm: PersonalDataForm) => doUpdatePersonalData(personalDataForm)"
        @update-mail="(mailForm: ChangeMailForm) => doUpdateEmail(mailForm)"
        @update-password="(passwordForm: ChangePasswordForm) => doUpdatePassword(passwordForm)"
    />
</template>
