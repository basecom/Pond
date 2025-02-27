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
          <template v-if="signedIn">
          <UiDropdownMenuItem>{{ $t('account.overview') }}</UiDropdownMenuItem>
          <UiDropdownMenuItem>{{ $t('account.personalProfile') }}</UiDropdownMenuItem>
          <UiDropdownMenuItem>{{ $t('account.addresses') }}</UiDropdownMenuItem>
          <UiDropdownMenuItem>{{ $t('account.paymentMethods') }}</UiDropdownMenuItem>
          <UiDropdownMenuItem>{{ $t('account.orders') }}</UiDropdownMenuItem>
          </template>
          <template v-else>
            huhu

            <LocaleLink to="/account/login" class="h-5">
              <Icon name="mdi:account-outline" class="size-5" />
            </LocaleLink>
          </template>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
</template>
