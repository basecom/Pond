<template>
    <UiAlert class="mb-4 flex gap-4">
        <Icon name="mdi:bell-check-outline" class="size-4" />

        <div>
            <UiAlertTitle>Pond Update: Cleaned and Ready!</UiAlertTitle>
            <UiAlertDescription>
                Just a heads-up! The pond has been cleaned and the water’s looking great. If you're planning to visit, it's all set for a peaceful stroll or some quiet time by the water. Enjoy!
            </UiAlertDescription>
        </div>
    </UiAlert>

    <UiAlert variant="destructive" class="flex gap-4">
        <Icon name="mdi:alert-circle-outline" class="size-4 text-red-500" />

        <div>
            <UiAlertTitle>Something went wrong</UiAlertTitle>
            <UiAlertDescription>
                I am an error message
            </UiAlertDescription>
        </div>
    </UiAlert>
</template>
