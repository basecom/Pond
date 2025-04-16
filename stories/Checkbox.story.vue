<template>
    <div class="grid gap-4">
        <div class="flex items-center space-x-2">
            <UiCheckbox id="terms" />
            <label
                for="terms"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                Accept terms and conditions
            </label>
        </div>

        <div class="flex items-center space-x-2">
            <UiCheckbox id="disabled" disabled />
            <label
                for="disabled"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                Disabled checkbox
            </label>
        </div>
    </div>
</template>
