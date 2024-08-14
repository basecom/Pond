<script setup lang="ts">

</script>

<template>
    <TabsRoot
        class="flex flex-col w-full"
        default-value="tab1"
    >
        <TabsList
            class="relative shrink-0 flex border-b border-gray-light"
            aria-label="Manage your account"
        >
            <TabsIndicator class="absolute px-8 left-0 h-1 bottom-0 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full transition-[width,transform] duration-300">
                <div class="bg-grass8 w-full h-full" />
            </TabsIndicator>
            <TabsTrigger
                class="bg-white px-5 py-2 flex-1 hover:text-status-success data-[state=active]:text-status-success data-[state=active]:border-b data-[state=active]:border-status-success focus-visible:relative"
                value="tab1"
            >
                login
            </TabsTrigger>
            <TabsTrigger
                class="bg-white px-5 py-2 flex-1 hover:text-status-success data-[state=active]:text-status-success data-[state=active]:border-b data-[state=active]:border-status-success focus-visible:relative"
                value="tab2"
            >
                register
            </TabsTrigger>
        </TabsList>
        <TabsContent
            class="grow py-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="tab1"
        >
            <AccountLogin />
        </TabsContent>
        <TabsContent
            class="grow py-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="tab2"
        >

            <AccountRegister/>
        </TabsContent>
    </TabsRoot>
</template>

<style scoped>

</style>