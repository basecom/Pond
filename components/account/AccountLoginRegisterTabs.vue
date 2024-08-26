<template>
    <TabsRoot
        class="flex w-full flex-col"
        default-value="tab-login"
    >
        <TabsList
            class="relative flex shrink-0 border-b border-gray-light"
            aria-label="Manage your account"
        >
            <TabsTrigger
                class="flex-1 bg-white px-5 py-2 hover:text-brand-primary focus-visible:relative data-[state=active]:border-b data-[state=active]:border-brand-primary data-[state=active]:text-brand-primary"
                value="tab-login"
            >
                login
            </TabsTrigger>
            <TabsTrigger
                class="flex-1 bg-white px-5 py-2 hover:text-brand-primary focus-visible:relative data-[state=active]:border-b data-[state=active]:border-brand-primary data-[state=active]:text-brand-primary"
                value="tab-register"
            >
                register
            </TabsTrigger>
        </TabsList>
        <TabsContent
            class="grow rounded-b-md bg-white py-5 outline-none"
            value="tab-login"
        >
            <AccountLogin :show-create-link="false" />
        </TabsContent>
        <TabsContent
            class="grow rounded-b-md bg-white py-5 outline-none"
            value="tab-register"
        >
            <AccountRegister />
        </TabsContent>
    </TabsRoot>
</template>
