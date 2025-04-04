<template>
    <div class="grid gap-4">
        <div class="grid w-full max-w-sm items-center gap-1.5">
            <UiLabel for="email">Email</UiLabel>
            <UiInput id="email" type="email" placeholder="Email" />
        </div>

        <div class="grid w-full max-w-sm items-center gap-1.5">
            <UiLabel for="picture">Picture</UiLabel>
            <UiInput id="picture" type="file" />
        </div>

        <UiInput
            type="email"
            disabled
            placeholder="disabled input field"
            class="max-w-sm"
        />
    </div>
</template>
