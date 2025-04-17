<template>
    <div class="container relative flex justify-center py-4">
        <div class="w-full md:w-2/3 xl:w-1/2">
            <AccountLogin redirect-to="/">
                <template #headline>
                    <h1 class="mb-4 text-lg font-semibold">{{ $t('account.auth.login') }}</h1>
                </template>
            </AccountLogin>
        </div>
    </div>
</template>
