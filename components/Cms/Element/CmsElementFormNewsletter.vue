<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    element: CmsElementForm;
}>();

const config = useCmsElementConfig(props.element);
const title = config.getConfigValue('title');

const elementData = useCmsElementData(props.element);
const { entityArrayToOptions } = useFormkitHelper();
const salutationOptions = computed(
    () => entityArrayToOptions<Schemas['Salutation']>(elementData.getData(), 'displayName', true) ?? [],
);

const { t } = useI18n();

const { isNewsletterSubscriber, newsletterSubscribe, newsletterUnsubscribe, getNewsletterStatus } = useNewsletter();
const { pushSuccess, pushError } = useNotifications();

const customerStore = useCustomerStore();
const { customer } = storeToRefs(customerStore);

const isSubscriber = ref(false);
const customerMail = ref('');

if (customer.value) {
    customerMail.value = customer.value.email;

    await getNewsletterStatus();

    if (isNewsletterSubscriber.value) {
        isSubscriber.value = true;
    }
}

// Store-API provides two options: direct and subscribe
// direct: The subscription is directly active and does not need a confirmation.
// subscribe: An email will be sent to the provided email address containing a link to the /newsletter/confirm route.
// current implementation seems to ignore this and directly subscribes if the customer is logged in with the same mail address
const subscribeBehavior = 'subscribe';

async function handleNewsletterSubmit(formValues) {
    if (newsletterAction.value === t('cms.element.form.newsletter.subscribe')) {
        try {
            await newsletterSubscribe({
                email: formValues.email,
                option: subscribeBehavior,
                salutationId: formValues.salutationId,
                firstName: formValues.firstName,
                lastName: formValues.lastName,
            });

            pushSuccess(
                isSubscriber.value
                    ? t('cms.element.form.newsletter.successSubscribe')
                    : t('cms.element.form.newsletter.successConfirmSubscribe'),
            );
        } catch (error) {
            pushError(t('cms.element.form.newsletter.errorSubscribe'));
        }
    } else if (newsletterAction.value === t('cms.element.form.newsletter.unsubscribe')) {
        try {
            await newsletterUnsubscribe(formValues.email);

            pushSuccess(t('cms.element.form.newsletter.successUnsubscribe'));
        } catch (error) {
            pushError(t('cms.element.form.newsletter.errorUnsubscribe'));
        }
    }
}

const newsletterAction = ref(
    isSubscriber.value ? t('cms.element.form.newsletter.unsubscribe') : t('cms.element.form.newsletter.subscribe'),
);

const newsletterOptions = [t('cms.element.form.newsletter.subscribe'), t('cms.element.form.newsletter.unsubscribe')];
</script>

<template>
    <h3 class="border-b border-gray pb-2 font-bold">
        {{ title }}
    </h3>

    <div
        v-if="isSubscriber"
        class="py-2"
    >
        {{ $t('cms.element.form.newsletter.alreadySubscriber') }}
        <br />
        {{ $t('cms.element.form.newsletter.unsubscribeInfo') }}
    </div>

    <FormKit
        type="form"
        :actions="false"
        :classes="{
            form: 'grid-cols-3 grid gap-4 mt-4',
        }"
        @submit="handleNewsletterSubmit"
    >
        <FormKit
            v-if="!isSubscriber"
            v-model="newsletterAction"
            type="radio"
            :options="newsletterOptions"
            validation="required"
        />

        <FormKit
            type="email"
            :value="customerMail"
            :label="$t('account.login.email.label')"
            name="email"
            :placeholder="$t('account.login.email.placeholder')"
            validation="required"
            :classes="{
                outer: 'col-span-3',
            }"
        />

        <template v-if="newsletterAction === $t('cms.element.form.newsletter.subscribe')">
            <FormKit
                type="select"
                name="salutationId"
                :placeholder="$t('account.register.salutation.placeholder')"
                :options="salutationOptions"
                :classes="{
                    outer: 'col-span-1',
                }"
            />

            <FormKit
                type="text"
                :label="$t('account.register.firstname.label')"
                name="firstName"
                :placeholder="$t('account.register.firstname.placeholder')"
                :classes="{
                    outer: 'col-span-1',
                }"
            />

            <FormKit
                type="text"
                :label="$t('account.register.lastname.label')"
                name="lastName"
                :placeholder="$t('account.register.lastname.placeholder')"
                :classes="{
                    outer: 'col-span-1',
                }"
            />
        </template>

        <FormKit
            type="checkbox"
            :label="$t('cms.element.form.newsletter.privacy.label')"
            :help="$t('cms.element.form.newsletter.privacy.help')"
            name="privacy"
            decorator-icon="check"
            validation="accepted"
            validation-visibility="submit"
            :classes="{
                outer: 'col-span-3',
            }"
        />

        <FormKit
            type="submit"
            :label="newsletterAction"
            :classes="{
                outer: 'col-span-2',
            }"
            prefix-icon="envelope"
        />
    </FormKit>
</template>
