<script setup lang="ts">
const { getNewsletterStatus, confirmationNeeded, newsletterStatus, newsletterConfirm } = useNewsletter();
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
    await getNewsletterStatus();

    if (confirmationNeeded.value) {
        try {
            await newsletterConfirm(emailHash, hash);

            notificationText.value = t('cms.element.form.newsletter.successSubscribe');
            notificationType.value = 'success';
        } catch (error) {
            notificationText.value = t('cms.element.form.newsletter.errorSubscribe');
            notificationType.value = 'danger';
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
