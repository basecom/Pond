<script setup lang="ts">
import type { NotificationType } from '~/types/NotificationType';

const { getNewsletterStatus, confirmationNeeded, newsletterStatus, newsletterConfirm } = useNewsletter();
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);
const { t } = useI18n();

const breadcrumbs = [];
breadcrumbs.push({
    name: 'Newsletter',
    path: '/newsletter/confirm',
});
useBreadcrumbs(breadcrumbs);

const isLoading = ref(true);
const notification = ref({
    type: 'info' as NotificationType,
    message: '',
    id: Math.floor((Math.random() * 100) + 1),
});

const route = useRoute();
const emailHash = route.query.em as string | null;
const hash = route.query.hash as string | null;

onMounted(async () => {
    if (!emailHash || !hash) {
        return;
    }

    // The store api only offers a way to check the status for logged-in users
    if (signedIn.value) {
        await getNewsletterStatus();
    }

    // Because of that we will always try to confirm the newsletter
    if (confirmationNeeded.value || !signedIn.value) {
        try {
            await newsletterConfirm(emailHash, hash);

            notification.value.message = t('cms.element.form.newsletter.successSubscribe');
            notification.value.type = 'success';
        } catch (error) {
            notification.value.message = t('cms.element.form.newsletter.errorSubscribe');
            notification.value.type = 'danger';
        }

        isLoading.value = false;
    } else if (newsletterStatus.value === 'optOut') {
        notification.value.message = t('cms.element.form.newsletter.noRegisterData');
        notification.value.type = 'danger';

        isLoading.value = false;
    } else {
        notification.value.message = t('cms.element.form.newsletter.alreadySubscriber');
        notification.value.type = 'info';

        isLoading.value = false;
    }
});
</script>

<template>
    <UtilityLoadingSpinner v-if="isLoading" />

    <div
        v-else
        class="container"
    >
        <UtilityStaticNotification
            :type="notification.type"
            :message="notification.message"
        />
    </div>
</template>
