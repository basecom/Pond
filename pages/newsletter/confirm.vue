<script setup lang="ts">
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
const notificationText = ref('');
const notificationType = ref('');

const route = useRoute();
const emailHash = route.query.em;
const hash = route.query.hash;

onMounted(async () => {
    // The store api only offers a way to check the status for logged-in users
    if (signedIn.value) {
        await getNewsletterStatus();
    }

    // Because of that we will always try to confirm the newsletter
    if (confirmationNeeded.value || !signedIn.value) {
        try {
            await newsletterConfirm(emailHash, hash);

            notificationText.value = t('cms.element.form.newsletter.successSubscribe');
            notificationType.value = 'success';
        } catch (error) {
            // If an error occurs and the user is not logged in, this is most likely because the email is already registered
            // TODO: Only keep the actual error handling once we no longer have to always try to confirm guests = once we can check their newsletter status beforehand
            if (!signedIn.value && error.details?.errors[0].code === 'VIOLATION::NOT_EQUAL_ERROR') {
                notificationText.value = t('cms.element.form.newsletter.alreadySubscriber');
                notificationType.value = 'info';
            } else {
                notificationText.value = t('cms.element.form.newsletter.errorSubscribe');
                notificationType.value = 'danger';
            }
        }

        isLoading.value = false;
    } else if (newsletterStatus.value === 'optOut') {
        notificationText.value = t('cms.element.form.newsletter.noRegisterData');
        notificationType.value = 'danger';

        isLoading.value = false;
    } else {
        notificationText.value = t('cms.element.form.newsletter.alreadySubscriber');
        notificationType.value = 'info';

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
            id="newsletter-confirmation-status"
            :type="notificationType"
            :message="notificationText"
        />
    </div>
</template>
