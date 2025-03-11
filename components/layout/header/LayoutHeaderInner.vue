<template>
    <slot name="header">
        <header class="sticky top-0 z-30 h-fit bg-white shadow">
            <div class="container relative py-3">
                <slot name="wrapper">
                    <div class="flex items-center justify-between gap-2">
                        <slot name="logo">
                            <LayoutLogo :logo-classes="{ 'w-6 h-6': true }" />
                        </slot>

                        <slot name="actions">
                            <LayoutHeaderActions />
                        </slot>
                    </div>
                </slot>
            </div>
        </header>
    </slot>
</template>
