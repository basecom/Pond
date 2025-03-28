<script setup lang="ts">
import {useForm} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import * as z from 'zod';

const {getSalutations, fetchSalutations} = useSalutations();
const {t} = useI18n();
const configStore = useConfigStore();

const accountTypes = [
    {label: t('account.register.accountTypes.private'), value: 'private'},
    {label: t('account.register.accountTypes.business'), value: 'business'},
] as const;
const salutations = ref<string[]>([]);
const businessType = ref<boolean>(false);

const registerSchema = toTypedSchema(
    z.object({
        accountType: z
            .string({
                required_error: t('account.register.accountTypes.errorGeneral'),
            })
            .nonempty(),
        salutation: z
            .string({
                required_error: t('account.register.salutations.errorGeneral'),
            }),
        title: z
            .string().optional(),
        firstName: z
            .string({
                required_error: t('account.register.firstName.errorGeneral'),
            }),
        lastName: z
            .string({
                required_error: t('account.register.lastName.errorGeneral'),
            }),
        email: z
            .string({
                required_error: t('account.register.email.errorGeneral'),
            })
            .email(t('account.register.email.errorGeneral')),
        confirmMail: z
            .string({
                required_error: t('account.register.email.errorGeneral'),
            })
            .email(t('account.register.email.errorGeneral')),
        birthdate: configStore.get('core.loginRegistration.birthdayFieldRequired')
            ? z.date({
                required_error: t('account.register.birthdate.errorGeneral'),
            })
            : z.date().optional(),
        company: z
            .string({
                required_error: t('account.register.company.errorGeneral'),
            }),
        department: z
            .string({
                required_error: 'No',
            }),
        vatNumber: z.string(),
        password: z
            .string({
                required_error: t('account.register.password.errorGeneral'),
            })
            .min(configStore.get('core.loginRegistration.passwordMinLength') ?? 0),
        confirmPassword: z
            .string({
                required_error: t('account.register.password.confirm.errorGeneral'),
            }),
        // address: {
        //     label: 'Street and House number',
        //     inputProps: {
        //         type: 'text',
        //         placeholder: 'Provide the account type',
        //     },
        // },
        // postalCode: {
        //     label: 'Post Code',
        //     inputProps: {
        //         type: 'text',
        //         placeholder: 'Provide postal code',
        //     },
        // },
        // city: {
        //     label: 'City',
        //     inputProps: {
        //         type: 'text',
        //         placeholder: 'Provide your city',
        //     },
        // },
        // additionalAddressLine1: {
        //     label: 'Additional Address line 1',
        //     inputProps: {
        //         type: 'text',
        //     },
        // },
        // additionalAddressLine2: {
        //     label: 'Additional Address line 2',
        //     inputProps: {
        //         type: 'text',
        //     },
        // },
        // country: {
        //     label: 'City',
        //     inputProps: {
        //         type: 'text',
        //         placeholder: 'Provide your city',
        //     },
        // },
        // state: {
        //     label: 'State',
        //     inputProps: {
        //         type: 'text',
        //         placeholder: 'Provide your state',
        //     },
        // },
        // phone: {
        //     label: 'Phone number',
        //     inputProps: {
        //         type: 'number',
        //         placeholder: 'Provide your phone number',
        //     },
        // },
    }).refine(data => data.email === data.confirmMail, {
        message: t('account.register.email.confirm.errorGeneral'),
        path: ['confirmMail'],
    })
        .refine(data => data.password === data.confirmPassword, {
            message: t('account.register.password.confirm.errorGeneral'),
            path: ['confirmPassword'],
        }),
);
const form = useForm({
    validationSchema: registerSchema,
});

const onSubmit = form.handleSubmit(() => {
    console.log('submitting all');
});

// If accountType is business, the company field will be rendered
watch(form.values, (values) => {
    if (values.accountType === 'business') {
        businessType.value = true;
        return;
    }
    businessType.value = false;
});

onBeforeMount(async () => {
    // Get fresh generated salutations
    await configStore.loadConfig();
    await fetchSalutations();
    salutations.value = getSalutations.value;
});
</script>

<template>
    <slot name="header">
        <h1 class="mb-5 text-3xl">{{ $t('account.register.header.main') }}</h1>
    </slot>
    <slot name="form">
        <form @submit="onSubmit">
            <slot name="generalFields">
                <div class="generalFields space-y-5">
                    <slot name="generalFieldsHeader">
                        <h3 class="text-xl">{{ $t('account.register.header.generalFields') }}</h3>
                    </slot>
                    <slot name="generalFieldsFormFields">
                        <FormField
                            v-if="configStore.get('core.loginRegistration.showAccountTypeSelection')"
                            v-slot="{ componentField }"
                            name="accountType"
                            @change="console.log('los gehts')"
                        >
                            <UiFormItem>
                                <UiFormLabel>{{ $t('account.register.accountTypes.label') }}</UiFormLabel>
                                <UiSelect v-bind="componentField">
                                    <UiFormControl>
                                        <UiSelectTrigger>
                                            <UiSelectValue
                                                :placeholder="$t('account.register.accountTypes.placeholder')"
                                            />
                                        </UiSelectTrigger>
                                    </UiFormControl>
                                    <UiSelectContent>
                                        <UiSelectGroup>
                                            <UiSelectItem
                                                v-for="accountType in accountTypes"
                                                :key="accountType.value"
                                                :value="accountType.value"
                                            >
                                                {{ accountType.label }}
                                            </UiSelectItem>
                                        </UiSelectGroup>
                                    </UiSelectContent>
                                </UiSelect>
                                <UiFormMessage/>
                            </UiFormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="salutation">
                            <UiFormItem>
                                <UiFormLabel>{{ $t('account.register.salutations.label') }}</UiFormLabel>
                                <UiSelect v-bind="componentField">
                                    <UiFormControl>
                                        <UiSelectTrigger>
                                            <UiSelectValue
                                                :placeholder="$t('account.register.salutations.placeholder')"
                                            />
                                        </UiSelectTrigger>
                                    </UiFormControl>
                                    <UiSelectContent>
                                        <UiSelectGroup>
                                            <UiSelectItem
                                                v-for="salutation in salutations"
                                                :key="salutation.id"
                                                :value="salutation.id"
                                            >
                                                {{ salutation.translated.displayName }}
                                            </UiSelectItem>
                                        </UiSelectGroup>
                                    </UiSelectContent>
                                </UiSelect>
                                <UiFormMessage/>
                            </UiFormItem>
                        </FormField>
                        <FormField
                            v-if="configStore.get('core.loginRegistration.showTitleField')"
                            v-slot="{ componentField }"
                            name="title"
                        >
                            <UiFormItem>
                                <UiFormLabel>{{ $t('account.register.title.label') }}</UiFormLabel>
                                <UiFormControl>
                                    <UiInput
                                        type="text"
                                        v-bind="componentField"
                                        :placeholder="$t('account.register.title.placeholder')"
                                        :aria-placeholder="$t('account.register.title.placeholder')"
                                    />
                                </UiFormControl>
                                <UiFormMessage/>
                            </UiFormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="firstName">
                            <UiFormItem>
                                <UiFormLabel>{{ $t('account.register.firstName.label') }}</UiFormLabel>
                                <UiFormControl>
                                    <UiInput
                                        type="text"
                                        v-bind="componentField"
                                        :placeholder="$t('account.register.firstName.placeholder')"
                                        :aria-placeholder="$t('account.register.firstName.placeholder')"
                                    />
                                </UiFormControl>
                                <UiFormMessage/>
                            </UiFormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="lastName">
                            <UiFormItem>
                                <UiFormLabel>{{ $t('account.register.lastName.label') }}</UiFormLabel>
                                <UiFormControl>
                                    <UiInput
                                        type="text"
                                        v-bind="componentField"
                                        :placeholder="$t('account.register.lastName.placeholder')"
                                        :aria-placeholder="$t('account.register.lastName.placeholder')"
                                    />
                                </UiFormControl>
                                <UiFormMessage/>
                            </UiFormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="email">
                            <UiFormItem>
                                <UiFormLabel>{{ $t('account.register.email.label') }}</UiFormLabel>
                                <UiFormControl>
                                    <UiInput
                                        type="email"
                                        v-bind="componentField"
                                        :placeholder="$t('account.register.email.placeholder')"
                                        :aria-placeholder="$t('account.register.email.placeholder')"
                                    />
                                </UiFormControl>
                                <UiFormMessage/>
                            </UiFormItem>
                        </FormField>
                        <FormField
                            v-if="configStore.get('core.loginRegistration.requireEmailConfirmation')"
                            v-slot="{ componentField }"
                            name="confirmMail"
                        >
                            <UiFormItem>
                                <UiFormLabel>{{ $t('account.register.email.confirm.label') }}</UiFormLabel>
                                <UiFormControl>
                                    <UiInput
                                        type="email"
                                        v-bind="componentField"
                                        :placeholder="$t('account.register.email.confirm.placeholder')"
                                        :aria-placeholder="$t('account.register.email.confirm.placeholder')"
                                    />
                                </UiFormControl>
                                <UiFormMessage/>
                            </UiFormItem>
                        </FormField>
                        <FormField
                            v-if="configStore.get('core.loginRegistration.showBirthdayField')"
                            v-slot="{ componentField }"
                            name="birthdate"
                        >
                            <UiFormItem>
                                <UiFormLabel v-if="configStore.get('core.loginRegistration.birthdayFieldRequired')">
                                    {{ $t('account.register.birthdate.labelRequired') }}
                                </UiFormLabel>
                                <UiFormLabel v-else>{{ $t('account.register.birthdate.label') }}</UiFormLabel>
                                <UiFormControl>
                                    <UiInput
                                        type="date"
                                        v-bind="componentField"
                                    />
                                </UiFormControl>
                                <UiFormMessage/>
                            </UiFormItem>
                        </FormField>
                        <FormField
                            v-if="businessType"
                            v-slot="{ componentField }"
                            name="company"
                        >
                            <UiFormItem>
                                <UiFormLabel>{{ $t('account.register.company.label') }}</UiFormLabel>
                                <UiFormControl>
                                    <UiInput
                                        type="text"
                                        v-bind="componentField"
                                        :placeholder="$t('account.register.company.placeholder')"
                                        :aria-placeholder="$t('account.register.company.placeholder')"
                                    />
                                </UiFormControl>
                            </UiFormItem>
                        </FormField>
                        <div v-if="businessType" class="flex">
                            <FormField
                                v-slot="{ componentField }"
                                name="department"
                            >
                                <UiFormItem>
                                    <UiFormLabel>{{ $t('account.register.department.label') }}</UiFormLabel>
                                    <UiFormControl>
                                        <UiInput
                                            type="text"
                                            v-bind="componentField"
                                            :placeholder="$t('account.register.department.placeholder')"
                                            :aria-placeholder="$t('account.register.department.placeholder')"
                                        />
                                    </UiFormControl>
                                </UiFormItem>
                            </FormField>
                            <FormField
                                v-slot="{ componentField }"
                                name="vatNumber"
                            >
                                <UiFormItem>
                                    <UiFormLabel>{{ $t('account.register.vatNumber.label') }}</UiFormLabel>
                                    <UiFormControl>
                                        <UiInput
                                            type="text"
                                            v-bind="componentField"
                                            :placeholder="$t('account.register.vatNumber.placeholder')"
                                            :aria-placeholder="$t('account.register.vatNumber.placeholder')"
                                        />
                                    </UiFormControl>
                                </UiFormItem>
                            </FormField>
                        </div>
                        <FormField v-slot="{ componentField }" name="password">
                            <UiFormItem>
                                <UiFormLabel>{{ $t('account.register.password.label') }}</UiFormLabel>
                                <UiFormControl>
                                    <UiInput
                                        type="password"
                                        v-bind="componentField"
                                        :placeholder="$t('account.register.password.placeholder')"
                                        :aria-placeholder="$t('account.register.password.placeholder')"
                                    />
                                </UiFormControl>
                                <UiFormDescription>
                                    {{ $t('account.register.password.requirements.length') }}
                                </UiFormDescription>
                                <UiFormMessage/>
                            </UiFormItem>
                        </FormField>
                        <FormField
                            v-if="configStore.get('core.loginRegistration.requirePasswordConfirmation')"
                            v-slot="{ componentField }"
                            name="confirmPassword"
                        >
                            <UiFormItem>
                                <UiFormLabel>{{ $t('account.register.password.confirm.label') }}</UiFormLabel>
                                <UiFormControl>
                                    <UiInput
                                        type="password"
                                        v-bind="componentField"
                                        :placeholder="$t('account.register.password.confirm.placeholder')"
                                        :aria-placeholder="$t('account.register.password.confirm.placeholder')"
                                    />
                                </UiFormControl>
                                <UiFormMessage/>
                            </UiFormItem>
                        </FormField>
                    </slot>
                </div>
            </slot>
            <slot name="submitAction">
                <UiButton type="submit">Submit</UiButton>
            </slot>
        </form>
    </slot>
</template>
