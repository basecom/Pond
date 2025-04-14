<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
      accountLinks?: {name: string, link: string}[];
      customer?: Schemas['Customer'];
    }>(),
    {
        accountLinks: undefined,
        customer: undefined,
    },
);

defineEmits<{
  logout: [];
}>();
</script>

<template>
    <div>
        <!-- mobile view -->
        <slot name="mobile-account-links">
            <UiAccordion class="mb-4 md:hidden" type="single" collapsible>
                <UiAccordionItem value="my-account">
                    <UiAccordionTrigger class="text-lg font-bold">{{ $t('account.myAccount') }}</UiAccordionTrigger>
                    <UiAccordionContent class="text-base">
                        <slot name="account-links">
                            <div v-if="accountLinks" class="grid gap-2">
                                <slot name="account-link">
                                    <NuxtLinkLocale
                                        v-for="accountLink in accountLinks"
                                        :key="accountLink.name"
                                        :to="accountLink.link"
                                        active-class="font-bold"
                                        class="max-w-max"
                                    >
                                        {{ $t(`account.${accountLink.name}`) }}
                                    </NuxtLinkLocale>
                                </slot>
                            </div>
                        </slot>
                    </UiAccordionContent>
                </UiAccordionItem>
            </UiAccordion>
        </slot>

        <!-- desktop view -->
        <slot name="desktop-account-links">
            <div class="hidden md:block">
                <slot name="welcome">
                    <h3 v-if="customer" class="mb-4 text-xl font-bold">
                        {{ $t('account.welcome', { name: customer.firstName + ' ' + customer.lastName }) }}
                    </h3>
                </slot>

                <slot name="account-links">
                    <div v-if="accountLinks" class="grid gap-4">
                        <slot name="account-link">
                            <NuxtLinkLocale
                                v-for="accountLink in accountLinks"
                                :key="accountLink.name"
                                :to="accountLink.link"
                                active-class="font-bold"
                                class="max-w-max"
                            >
                                {{ $t('account.'+accountLink.name) }}
                            </NuxtLinkLocale>
                        </slot>
                    </div>
                </slot>

                <UiDropdownMenuSeparator class="my-4" />

                <slot name="action-logout">
                    <div class="max-w-max cursor-pointer" @click="$emit('logout')">
                        <slot name="logout">
                            {{ $t('account.auth.logout') }}
                        </slot>
                    </div>
                </slot>
            </div>
        </slot>
    </div>
</template>
