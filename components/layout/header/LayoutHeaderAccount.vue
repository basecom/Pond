<script setup lang="ts">
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);
</script>

<template>
    <!--todo nele: UiDropdown mit modal zu login und link zu register (wei shopware default so ein wenig)-->
    <UiDropdownMenu>
        <UiDropdownMenuTrigger class="size-5">
            <Icon name="mdi:account-outline" class="size-5" />
        </UiDropdownMenuTrigger>

        <UiDropdownMenuContent>
            <UiDropdownMenuLabel>{{ $t('account.myAccount') }}</UiDropdownMenuLabel>
            <UiDropdownMenuSeparator />

            <!-- user view -->
            <template v-if="signedIn">
                <UiDropdownMenuItem>{{ $t('account.overview') }}</UiDropdownMenuItem>
                <UiDropdownMenuItem>{{ $t('account.personalProfile') }}</UiDropdownMenuItem>
                <UiDropdownMenuItem>{{ $t('account.addresses') }}</UiDropdownMenuItem>
                <UiDropdownMenuItem>{{ $t('account.paymentMethods') }}</UiDropdownMenuItem>
                <UiDropdownMenuItem>{{ $t('account.orders') }}</UiDropdownMenuItem>
            </template>

            <!-- guest view -->
            <template v-else>
                <UiDropdownMenuItem>{{ $t('account.auth.login') }}</UiDropdownMenuItem>

                <UiDropdownMenuItem>
                    <LocaleLink to="/account/register">
                        {{ $t('account.auth.register') }}
                    </LocaleLink>
                </UiDropdownMenuItem>
            </template>
        </UiDropdownMenuContent>
    </UiDropdownMenu>
</template>
