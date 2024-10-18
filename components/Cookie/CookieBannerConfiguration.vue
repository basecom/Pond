<script setup lang="ts">
const { cookieGroups, activeCookies } = defineProps<{
    isAcceptAllEnabled: boolean;
    cookieGroups: CookieGroup[];
    activeCookies: CookieEntry['cookie'][];
}>();

const emit = defineEmits<{
    'update-cookies': [active: CookieEntry['cookie'][], inactive: CookieEntry['cookie'][]];
    'deny-all': [];
    'accept-all': [];
}>();

const selectCookieGroup = (group: CookieGroup, event: Event) => {
    const target = event.target as HTMLInputElement;
    group.entries.forEach(entry => {
        const node = getNode(entry.id);

        if (!node) {
            return;
        }

        node.input(target.checked);
    });
};

const selectCookieEntry = (entry: CookieEntry, group: CookieGroup, event: Event) => {
    const groupNode = getNode(group.id);
    const target = event.target as HTMLInputElement;
    const areAllCookiesSelected = group.entries.every(currentEntry =>
        currentEntry.id === entry.id ? target.checked : getNode(currentEntry.id)?.value,
    );

    if (!groupNode) {
        return;
    }

    groupNode.input(areAllCookiesSelected);
};

const handleSubmit = (values: Record<CookieEntry['cookie'], boolean | undefined>) => {
    const cookieEntryWithValue = cookieGroups.flatMap(group => group.entries).filter(entry => entry.cookie);
    const active: CookieEntry['cookie'][] = cookieEntryWithValue
        .filter(entry => values[entry.id])
        .map(entry => entry.cookie);
    const inactive: CookieEntry['cookie'][] = cookieEntryWithValue
        .filter(entry => !values[entry.id])
        .map(entry => entry.cookie);

    emit('update-cookies', active, inactive);
};

onMounted(() => {
    cookieGroups.forEach(group => {
        const isRequired = group.required;
        const groupNode = getNode(group.id);
        const areAllCookiesSelected = group.entries.every(entry => activeCookies.includes(entry.cookie));

        if (!groupNode) {
            return;
        }

        group.entries.forEach(entry => {
            const node = getNode(entry.id);

            if (!node) {
                return;
            }

            node.input(activeCookies.includes(entry.cookie) || isRequired);
        });

        groupNode.input(areAllCookiesSelected || isRequired);
    });
});
</script>

<template>
    <div class="mb-3">
        {{ $t('cookie.banner.additionalInformationText') }}
    </div>

    <FormKit
        type="form"
        :actions="false"
        :submit-label="$t('cookie.modal.submitLabel')"
        @submit="handleSubmit"
    >
        <div class="mb-4 border-b border-t py-3">
            <div
                v-for="group in cookieGroups"
                :key="group.id"
                class="mb-2"
            >
                <FormKit
                    :id="group.id"
                    type="checkbox"
                    :label="$t(group.name)"
                    :name="group.id"
                    :disabled="group.required"
                    :ignore="true"
                    @change="selectCookieGroup(group, $event)"
                />
                <div class="mb-1 ml-6">{{ group.description && $t(group.description) }}</div>

                <div
                    v-for="entry in group.entries"
                    :key="entry.id"
                    class="ml-6"
                    :class="{
                        hidden: entry.hidden,
                    }"
                >
                    <FormKit
                        :id="entry.id"
                        type="checkbox"
                        :label="$t(entry.name)"
                        :disabled="group.required"
                        :name="entry.id"
                        @change="selectCookieEntry(entry, group, $event)"
                    />
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-end gap-2 md:flex-row">
            <FormKit
                type="button"
                :label="$t('cookie.modal.denyAllButton')"
                @click="() => emit('deny-all')"
            />
            <FormKit
                type="submit"
                :label="$t('cookie.modal.submitLabel')"
            />
            <FormKit
                v-if="isAcceptAllEnabled"
                type="button"
                :label="$t('cookie.modal.allowAllButton')"
                @click="() => emit('accept-all')"
            />
        </div>
    </FormKit>
</template>
