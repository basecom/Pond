<template>
    <div class="grid gap-4">
        <div class="grid w-full max-w-sm items-center gap-1.5">
            <UiLabel for="text">Your Pond Adventures</UiLabel>
            <UiTextarea id="text" placeholder="Your Pond Adventures..." />
        </div>

        <div class="grid w-full max-w-sm items-center gap-1.5">
            <UiLabel for="disabled-text">Disabled Textarea</UiLabel>
            <UiTextarea id="disabled-text" placeholder="Disabled Textarea..." disabled />
        </div>
    </div>
</template>
