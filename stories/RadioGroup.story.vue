<template>
    <UiRadioGroup default-value="comfortable" :orientation="'vertical'">
        <div class="flex items-center space-x-2">
            <UiRadioGroupItem id="r1" value="default" />
            <Label for="r1">Default</Label>
        </div>
        <div class="flex items-center space-x-2">
            <UiRadioGroupItem id="r2" value="comfortable" />
            <Label for="r2">Comfortable</Label>
        </div>
        <div class="flex items-center space-x-2">
            <UiRadioGroupItem id="r3" value="disabled" disabled />
            <Label for="r3">disabled</Label>
        </div>
    </UiRadioGroup>
</template>
