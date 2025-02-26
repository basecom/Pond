<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);
</script>

<template>
    <template v-if="!signedIn">
        <LocaleLink to="/account/login" class="h-5">
            <Icon name="mdi:account-outline" class="size-5" />
        </LocaleLink>
    </template>

    <template v-else>
        <DropdownMenu>
            <DropdownMenuTrigger class="size-5">
                <Icon name="mdi:account-outline" class="size-5" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </template>
</template>
