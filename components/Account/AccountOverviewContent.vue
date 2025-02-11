<script setup lang="ts">
const customerStore = useCustomerStore();
const { customer } = storeToRefs(customerStore);
const { isNewsletterSubscriber, newsletterSubscribe, newsletterUnsubscribe, getNewsletterStatus, confirmationNeeded } =
    useNewsletter();
const billingAddress = computed(() => customer.value.defaultBillingAddress);
const shippingAddress = computed(() => customer.value.defaultShippingAddress);
const paymentMethod = computed(() => customer.value.defaultPaymentMethod);
const { getLatestOrder } = useCustomerLatestOrder();
const { pushSuccess, pushError } = useNotifications();
const { trackNewsletterRegistration } = useAnalytics();
const { t } = useI18n();

const props = defineProps<{
    showLatestOrder: boolean;
}>();

const latestOrder = props.showLatestOrder && (await getLatestOrder());
getNewsletterStatus();

const configStore = useConfigStore();
const doubleOptIn = configStore.get('core.newsletter.doubleOptIn');
const doubleOptInRegistered = configStore.get('core.newsletter.doubleOptInRegistered');
const subscribeBehavior =
    (customer.value && doubleOptInRegistered) || (!customer.value && doubleOptIn) ? 'subscribe' : 'direct';

const handleNewsletterChange = async (event: Event) => {
    const { checked } = event.target as HTMLInputElement;
    if (checked) {
        try {
            await newsletterSubscribe({
                email: customer.value.email,
                option: subscribeBehavior,
            });

            trackNewsletterRegistration();

            pushSuccess(
                subscribeBehavior === 'direct'
                    ? t('cms.element.form.newsletter.successSubscribe')
                    : t('cms.element.form.newsletter.successConfirmSubscribe'),
            );
        } catch (error) {
            pushError(t('cms.element.form.newsletter.errorSubscribe'));
        }
    } else {
        try {
            await newsletterUnsubscribe(customerStore.customer.email);

            pushSuccess(t('cms.element.form.newsletter.successUnsubscribe'));
        } catch (error) {
            pushError(t('cms.element.form.newsletter.errorUnsubscribe'));
        }
    }
};
</script>

<template>
    <h1 class="mb-2 font-bold">{{ $t('account.overview.heading') }}</h1>
    <div class="mb-4 text-base">
        {{ $t('account.overview.subHeading') }}
    </div>

    <div
        v-if="customerStore.customer"
        class="col-span-2 grid grid-cols-1 gap-6 lg:grid-cols-2"
    >
        <div class="rounded-lg bg-white p-4 shadow-md">
            <h3 class="mb-2 text-lg font-semibold">{{ $t('account.overview.personalInformation.heading') }}</h3>
            <p>
                <strong>{{ $t('account.overview.personalInformation.nameLabel') }}</strong> {{ customer.firstName }}
                {{ customer.lastName }}
            </p>
            <p>
                <strong>{{ $t('account.overview.personalInformation.emailLabel') }}</strong> {{ customer.email }}
            </p>
        </div>

        <div class="rounded-lg bg-white p-4 shadow-md">
            <h3 class="mb-2 text-lg font-semibold">{{ $t('account.overview.paymentMethod.heading') }}</h3>
            <p>
                <strong>{{ $t('account.overview.paymentMethod.nameLabel') }}</strong> {{ paymentMethod.name }}
            </p>
            <p>
                <strong>{{ $t('account.overview.paymentMethod.descriptionLabel') }}</strong>
                {{ paymentMethod.description }}
            </p>
        </div>
    </div>

    <div
        v-if="customer"
        class="col-span-2 mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2"
    >
        <div class="rounded-lg bg-white p-4 shadow-md">
            <h3 class="mb-2 text-lg font-semibold">{{ $t('account.overview.billingAddressHeading') }}</h3>
            <AddressData :address="billingAddress" />
        </div>

        <div class="rounded-lg bg-white p-4 shadow-md">
            <h3 class="mb-2 text-lg font-semibold">{{ $t('account.overview.shippingAddressHeading') }}</h3>
            <AddressData :address="shippingAddress" />
        </div>
    </div>

    <div
        v-if="customer"
        class="mt-4 rounded-lg bg-white p-4 shadow-md"
    >
        <h3 class="mb-2 text-lg font-semibold">{{ $t('account.overview.newsletter.heading') }}</h3>
        <label>
            <input
                type="checkbox"
                :checked="isNewsletterSubscriber && !confirmationNeeded"
                @change="handleNewsletterChange"
            >
            {{ $t('account.overview.newsletter.label') }}
        </label>
    </div>

    <div
        v-if="customer && showLatestOrder && latestOrder"
        class="mt-4 rounded-lg bg-white p-4 shadow-md"
    >
        <h3 class="text-lg font-semibold">{{ $t('account.overview.latestOrderHeading') }}</h3>
        <SharedAccordionRoot>
            <AccountOrderItem :order-id="latestOrder.id" />
        </SharedAccordionRoot>
    </div>
</template>
