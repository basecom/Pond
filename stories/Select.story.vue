<template>
    <div class="max-w-sm">
        <UiSelect>
            <UiSelectTrigger>
                <UiSelectValue placeholder="Choose your Pond Activity" />
            </UiSelectTrigger>

            <UiSelectContent>
                <UiSelectGroup>
                    <UiSelectLabel>Pond Activity</UiSelectLabel>

                    <UiSelectItem value="relax">
                        Relax by the Water
                    </UiSelectItem>

                    <UiSelectItem value="fishing">
                        Go Fishing
                    </UiSelectItem>

                    <UiSelectItem value="aquatic">
                        Observe Aquatic Life
                    </UiSelectItem>

                    <UiSelectItem value="picnic">
                        Enjoy a Picnic by the Pond
                    </UiSelectItem>

                    <UiSelectItem value="sunset">
                        Photography Session at Sunset
                    </UiSelectItem>
                </UiSelectGroup>
            </UiSelectContent>
        </UiSelect>
    </div>
</template>
