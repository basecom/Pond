<script setup lang="ts">
withDefaults(
    defineProps<{
      signedIn?: boolean;
    }>(),
    {
        signedIn: false,
    },
);
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
                        <slot name="overview">
                            {{ $t('account.overview') }}
                        </slot>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <slot name="personal-profile">
                            {{ $t('account.personalProfile') }}
                        </slot>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <slot name="addresses">
                            {{ $t('account.addresses') }}
                        </slot>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <slot name="payment-methods">
                            {{ $t('account.paymentMethods') }}
                        </slot>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <slot name="orders">
                            {{ $t('account.orders') }}
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
                                <UiDialogTitle>Login</UiDialogTitle>
                            </UiDialogHeader>

                            <UiDialogFooter>
                                Login
                            </UiDialogFooter>
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
