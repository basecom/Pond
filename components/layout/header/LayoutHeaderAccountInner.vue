<script setup lang="ts">
withDefaults(
    defineProps<{
      signedIn?: boolean;
    }>(),
    {
        signedIn: false,
    },
);

defineEmits<{
  logout: [];
}>();
</script>

<template>
    <UiDropdownMenu>
        <slot name="action-login-menu">
            <UiDropdownMenuTrigger class="size-5">
                <slot name="icon">
                    <Icon name="mdi:account-outline" class="size-5" />
                </slot>
            </UiDropdownMenuTrigger>
        </slot>

        <UiDropdownMenuContent>
            <UiDropdownMenuLabel>
                <slot name="account-headline">
                    {{ $t('account.myAccount') }}
                </slot>
            </UiDropdownMenuLabel>

            <UiDropdownMenuSeparator />

            <!-- user view -->
            <template v-if="signedIn">
                <slot name="signed-in">
                    <UiDropdownMenuItem>
                        <slot name="action-overview">
                            <NuxtLinkLocale to="/account">
                                <slot name="overview">
                                    {{ $t('account.overview.label') }}
                                </slot>
                            </NuxtLinkLocale>
                        </slot>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <slot name="action-personal-profile">
                            <NuxtLinkLocale to="/account/profile">
                                <slot name="personal-profile">
                                    {{ $t('account.personalProfile') }}
                                </slot>
                            </NuxtLinkLocale>
                        </slot>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <slot name="action-addresses">
                            <NuxtLinkLocale to="/account/address">
                                <slot name="personal-addresses">
                                    {{ $t('account.addresses') }}
                                </slot>
                            </NuxtLinkLocale>
                        </slot>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <slot name="action-payment-methods">
                            <NuxtLinkLocale to="/account/payment">
                                <slot name="personal-payment-methods">
                                    {{ $t('account.paymentMethods') }}
                                </slot>
                            </NuxtLinkLocale>
                        </slot>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <slot name="action-orders">
                            <NuxtLinkLocale to="/account/order">
                                <slot name="personal-orders">
                                    {{ $t('account.orders') }}
                                </slot>
                            </NuxtLinkLocale>
                        </slot>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <slot name="action-wishlist">
                            <NuxtLinkLocale to="/account/wishlist">
                                <slot name="wishlist">
                                    {{ $t('account.wishlist') }}
                                </slot>
                            </NuxtLinkLocale>
                        </slot>
                    </UiDropdownMenuItem>

                    <UiDropdownMenuSeparator />
                    <UiDropdownMenuItem class="cursor-pointer" @click="$emit('logout')">
                        <slot name="logout">
                            {{ $t('account.auth.logout') }}
                        </slot>
                    </UiDropdownMenuItem>
                </slot>
            </template>

            <!-- guest view -->
            <template v-else>
                <slot name="guest">
                    <UiDialog>
                        <UiDialogTrigger class="w-full">
                            <slot name="action-login">
                                <UiDropdownMenuItem class="cursor-pointer" @select.prevent="">
                                    <slot name="login">
                                        {{ $t('account.auth.login') }}
                                    </slot>
                                </UiDropdownMenuItem>
                            </slot>
                        </UiDialogTrigger>

                        <UiDialogContent>
                            <UiDialogHeader>
                                <UiDialogTitle>
                                    {{ $t('account.auth.login') }}
                                </UiDialogTitle>
                            </UiDialogHeader>

                            <AccountLogin />
                        </UiDialogContent>
                    </UiDialog>

                    <UiDropdownMenuItem>
                        <slot name="action-register">
                            <NuxtLinkLocale to="/account/register">
                                <slot name="register">
                                    {{ $t('account.auth.register') }}
                                </slot>
                            </NuxtLinkLocale>
                        </slot>
                    </UiDropdownMenuItem>
                </slot>
            </template>
        </UiDropdownMenuContent>
    </UiDropdownMenu>
</template>
