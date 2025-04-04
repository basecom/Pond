<template>
    <div class="grid grid-cols-4 gap-4">
        <UiButton>
            Button
        </UiButton>

        <UiButton variant="secondary">
            Secondary
        </UiButton>

        <UiButton variant="destructive">
            Destructive
        </UiButton>

        <UiButton variant="outline">
            Outline
        </UiButton>

        <UiButton variant="ghost">
            Ghost
        </UiButton>

        <UiButton variant="link">
            Link
        </UiButton>

        <UiButton variant="outline" size="icon">
            <Icon name="mdi:alert-circle-outline" class="size-4" />
        </UiButton>

        <UiButton :is-loading="true">
            Please wait
        </UiButton>

        <UiButton size="lg">
            Button large
        </UiButton>

        <UiButton size="sm">
            Button small
        </UiButton>

        <UiButton size="xs">
            Button extra small
        </UiButton>
    </div>
</template>
