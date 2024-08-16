<script setup lang="ts"></script>

<template>
    <TabsRoot
        class="flex w-full flex-col"
        default-value="tab1"
    >
        <TabsList
            class="relative flex shrink-0 border-b border-gray-light"
            aria-label="Manage your account"
        >
            <TabsIndicator
                class="absolute bottom-0 left-0 h-1 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full px-8 transition-[width,transform] duration-300"
            >
                <div class="bg-grass8 h-full w-full" />
            </TabsIndicator>
            <TabsTrigger
                class="flex-1 bg-white px-5 py-2 hover:text-status-success focus-visible:relative data-[state=active]:border-b data-[state=active]:border-status-success data-[state=active]:text-status-success"
                value="tab1"
            >
                login
            </TabsTrigger>
            <TabsTrigger
                class="flex-1 bg-white px-5 py-2 hover:text-status-success focus-visible:relative data-[state=active]:border-b data-[state=active]:border-status-success data-[state=active]:text-status-success"
                value="tab2"
            >
                register
            </TabsTrigger>
        </TabsList>
        <TabsContent
            class="grow rounded-b-md bg-white py-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="tab1"
        >
            <AccountLogin />
        </TabsContent>
        <TabsContent
            class="grow rounded-b-md bg-white py-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="tab2"
        >
            <AccountRegister />
        </TabsContent>
    </TabsRoot>
</template>

<style scoped></style>
