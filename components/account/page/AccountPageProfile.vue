<script setup lang="ts">
// import { useToast } from '@/components/ui/toast/use-toast';

const customerStore = useCustomerStore();
const { updatePersonalInfo } = useUser();
// const { toast } = useToast();

const { customer } = storeToRefs(customerStore);

const doUpdateEmail = async () => {
    // try {
    //     await updateEmail(mailData);
    //     toast({
    //         title: 'Uh oh! Something went wrong.',
    //         description: 'There was a problem with your request.',
    //     });
    // } catch (error) {
    // }
};

</script>

<template>
    <AccountPageProfileInner
        v-if="customer"
        :customer="customer"
        @update-personal-data="(personalData: any) => updatePersonalInfo(personalData)"
        @update-mail="(mailData: any) => doUpdateEmail(mailData)"
    />
</template>
