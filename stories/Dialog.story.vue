<template>
    <UiDialog>
        <UiDialogTrigger as-child>
            <UiButton>
                Check Pond Status
            </UiButton>
        </UiDialogTrigger>
    
        <UiDialogContent>
            <UiDialogHeader>
                <UiDialogTitle>Pond Update Available</UiDialogTitle>
                <UiDialogDescription>
                    Stay informed about the latest changes to your favorite pond. We’ve got a fresh update on water quality and maintenance status.
                </UiDialogDescription>
            </UiDialogHeader>

            <div class="grid gap-4 py-4">
                The pond has been recently cleaned and the water is now clear and ready for your next visit. We've removed debris, checked water levels, and ensured everything is in top shape for a peaceful experience.
            </div>

            <UiDialogFooter>
                <UiButton type="submit">
                    Save Update
                </UiButton>
            </UiDialogFooter>
        </UiDialogContent>
    </UiDialog>
</template>
