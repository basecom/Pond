<script setup lang="ts">
import {type Schemas} from '@shopware/api-client/store-api-types';
import * as z from 'zod';
import {DependencyType} from "~/components/ui/auto-form/interface";
import {toTypedSchema} from '@vee-validate/zod';
import {useForm} from 'vee-validate';

// Composable
const {getSalutations, fetchSalutations} = useSalutations();
const {getCountries, fetchCountries, getStatesForCountry} = useCountries();
const {t} = useI18n();
const configStore = useConfigStore();

// Props and emits
withDefaults(
    defineProps<{
        isLoading?: boolean;
        errorMessage?: string;
    }>(),
    {
        isLoading: false,
        errorMessage: undefined,
    },
);

const emits = defineEmits<{
    register: [registerData: RegisterData];
}>();

// Custom properties and refs
const accountTypes = {
    'private': {label: t('account.register.accountTypes.private'), value: 'private'},
    'business': {label: t('account.register.accountTypes.business'), value: 'business'},
};

const salutations = ref<Array<Schemas['Salutation']> | null>();
const countries = ref<Array<Schemas['Country']> | null>();
const states = ref<Array<Schemas['CountryState']> | null>();
// Calculate if passwordMinLength was set in admin config and convert result into processable zod.min type
const passwordMinLength = computed<number>(() => {
    return configStore.get('core.loginRegistration.passwordMinLength')
        ? Number(configStore.get('core.loginRegistration.passwordMinLength'))
        : 0
});
const generalFieldSchema = z.object({
    headerMain: z.void(),
    headerGeneral: z.void(),
    accountType: z.string({
        required_error: t('account.register.accountTypes.errorGeneral')
    }),
    salutationId: z
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
        ? z
            .coerce.date({
                required_error: t('account.register.birthdate.errorGeneral'),
            })
        : z
            .coerce.date()
            .optional(),
    company: z
        .string({
            required_error: t('account.register.company.errorGeneral'),
        }),
    department: z
        .string({
            required_error: t('account.register.department.errorGeneral'),
        }),
    vatNumber: z.string(),
    password: z
        .string({
            required_error: t('account.register.password.error.general'),
        })
        .min(
            passwordMinLength.value,
            t('account.register.password.error.minLength', {length: passwordMinLength.value})
        ),
    confirmPassword: z
        .string({
            required_error: t('account.register.password.confirm.errorGeneral'),
        }),
});
const shortAddressFieldSchema = z.object({
    headerAddress: z.void(),
    street: z
        .string({
            required_error: t('account.register.address.error.required')
        })
        .min(3, t('account.register.address.error.general'))
        .regex(
            /^(\d+[a-zA-Z]?(?:-\d+[a-zA-Z]?)?\s[A-Za-zÄÖÜäöüß\s-]+|\b[A-Za-zÄÖÜäöüß\s-]+\s\d+[a-zA-Z]?(?:-\d+[a-zA-Z]?)?\b)$/,
            t('account.register.address.error.general')
        ),
    zipcode: z
        .string({
            required_error: t('account.register.postalCode.error.required'),
        })
        .regex(/^\d{5}$/, t('account.register.postalCode.error.general')),
    city: z
        .string({
            required_error: t('account.register.city.error.required'),
        })
        .regex(/^[a-zA-ZäöüÄÖÜß\s-]+$/, t('account.register.city.error.general')),
    additionalAddressLine1: configStore.get('core.loginRegistration.additionalAddressField1Required')
        ? z.string({
            required_error: t('account.register.additionalAddressLine1.error.required'),
        })
        : z.string().optional(),
    additionalAddressLine2: configStore.get('core.loginRegistration.additionalAddressField2Required')
        ? z.string({
            required_error: t('account.register.additionalAddressLine2.error.required'),
        })
        : z.string().optional(),
    countryId: z
        .string({
            required_error: t('account.register.country.error.required'),
        }),
    countryState: z.string().optional(),
    phoneNumber: configStore.get('core.loginRegistration.phoneNumberFieldRequired')
        ? z
            .string({
                required_error: t('account.register.phone.error.required')
            })
            .regex(
                /^\+?\d{1,4}[-.\s]?\(?\d{1,5}\)?[-.\s]?\d{1,9}([-.\s]?\d{1,9})?$/,
                t('account.register.phone.error.general')
            )
        : z
            .string()
            .regex(
                /^\+?\d{1,4}[-.\s]?\(?\d{1,5}\)?[-.\s]?\d{1,9}([-.\s]?\d{1,9})?$/,
                t('account.register.phone.error.general')
            )
            .optional(),
    deliveryAddressVaries: z.boolean().optional(),
});
const addressFieldSchema = z.object({
    accountType: z.string(),
    salutationId: z
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
    company: z
        .string({
            required_error: t('account.register.company.errorGeneral'),
        }),
    department: z
        .string({
            required_error: t('account.register.department.errorGeneral'),
        }),
    street: z
        .string({
            required_error: t('account.register.address.error.required')
        })
        .min(3, t('account.register.address.error.general'))
        .regex(
            /^(\d+[a-zA-Z]?(?:-\d+[a-zA-Z]?)?\s[A-Za-zÄÖÜäöüß\s-]+|\b[A-Za-zÄÖÜäöüß\s-]+\s\d+[a-zA-Z]?(?:-\d+[a-zA-Z]?)?\b)$/,
            t('account.register.address.error.general')
        ),
    zipcode: z
        .string({
            required_error: t('account.register.postalCode.error.required'),
        })
        .regex(/^\d{5}$/, t('account.register.postalCode.error.general')),
    city: z
        .string({
            required_error: t('account.register.city.error.required'),
        })
        .regex(/^[a-zA-ZäöüÄÖÜß\s-]+$/, t('account.register.city.error.general')),
    additionalAddressLine1: configStore.get('core.loginRegistration.additionalAddressField1Required')
        ? z.string({
            required_error: t('account.register.additionalAddressLine1.error.required'),
        })
        : z.string().optional(),
    additionalAddressLine2: configStore.get('core.loginRegistration.additionalAddressField2Required')
        ? z.string({
            required_error: t('account.register.additionalAddressLine2.error.required'),
        })
        : z.string().optional(),
    countryId: z
        .string({
            required_error: t('account.register.country.error.required'),
        }),
    countryState: z.string(),
    phoneNumber: configStore.get('core.loginRegistration.phoneNumberFieldRequired')
        ? z
            .string({
                required_error: t('account.register.phone.error.required')
            })
            .regex(
                /^\+?\d{1,4}[-.\s]?\(?\d{1,5}\)?[-.\s]?\d{1,9}([-.\s]?\d{1,9})?$/,
                t('account.register.phone.error.general')
            )
        : z
            .string()
            .regex(
                /^\+?\d{1,4}[-.\s]?\(?\d{1,5}\)?[-.\s]?\d{1,9}([-.\s]?\d{1,9})?$/,
                t('account.register.phone.error.general')
            )
            .optional()
});
const tosSchema = z.object({
    acceptedDataProtection: z.boolean({
        required_error: t('account.register.tos.errorGeneral')
    })
});

// TODO: Fix typing
const fieldConfig = {
    title: {
        label: t('account.register.title.label'),
        inputProps: {
            placeholder: t('account.register.title.placeholder'),
        }
    },
    firstName: {
        label: t('account.register.firstName.label'),
        inputProps: {
            placeholder: t('account.register.firstName.placeholder'),
        }
    },
    lastName: {
        label: t('account.register.lastName.label'),
        inputProps: {
            placeholder: t('account.register.lastName.placeholder'),
        }
    },
    email: {
        label: t('account.register.email.label'),
        inputProps: {
            placeholder: t('account.register.email.placeholder'),
        }
    },
    confirmMail: {
        label: t('account.register.email.confirm.label'),
        inputProps: {
            placeholder: t('account.register.email.confirm.placeholder'),
        }
    },
    birthdate: {
        label: t('account.register.birthdate.label'),
        inputProps: {
            placeholder: 'Test',
        }
    },
    company: {
        label: t('account.register.company.label'),
        inputProps: {
            placeholder: t('account.register.company.placeholder'),
        }
    },
    department: {
        label: t('account.register.department.label'),
        inputProps: {
            placeholder: t('account.register.department.placeholder'),
        }
    },
    vatNumber: {
        label: t('account.register.vatNumber.label'),
        inputProps: {
            placeholder: t('account.register.vatNumber.placeholder'),
        }
    },
    password: {
        label: t('account.register.password.label'),
        inputProps: {
            placeholder: t('account.register.password.placeholder'),
        }
    },
    confirmPassword: {
        label: t('account.register.password.confirm.label'),
        inputProps: {
            placeholder: t('account.register.password.confirm.placeholder'),
        }
    },
    street: {
        label: t('account.register.address.label'),
        inputProps: {
            placeholder: t('account.register.address.placeholder'),
        }
    },
    zipcode: {
        label: t('account.register.postalCode.label'),
        inputProps: {
            placeholder: t('account.register.postalCode.placeholder'),
        }
    },
    city: {
        label: t('account.register.city.label'),
        inputProps: {
            placeholder: t('account.register.city.placeholder'),
        }
    },
    additionalAddressLine1: {
        label: t('account.register.additionalAddressLine1.label'),
        inputProps: {
            placeholder: t('account.register.additionalAddressLine1.placeholder'),
        }
    },
    additionalAddressLine2: {
        label: t('account.register.additionalAddressLine2.label'),
        inputProps: {
            placeholder: t('account.register.additionalAddressLine2.placeholder'),
        }
    },
    phoneNumber: {
        label: t('account.register.phone.label'),
        inputProps: {
            placeholder: t('account.register.phone.placeholder'),
        }
    },
    deliveryAddressVaries: {
        label: t('account.register.differentShippingAddress')
    },
    shippingAddress: {
        accountType: {
            label: t('account.register.accountTypes.label'),
            inputProps: {
                placeholder: t('account.register.accountTypes.placeholder'),
            }
        },
        salutationId: {
            label: t('account.register.salutations.label'),
            inputProps: {
                placeholder: t('account.register.salutations.placeholder'),
            }
        },
        title: {
            label: t('account.register.title.label'),
            inputProps: {
                placeholder: t('account.register.title.placeholder'),
            }
        },
        firstName: {
            label: t('account.register.firstName.label'),
            inputProps: {
                placeholder: t('account.register.firstName.placeholder'),
            }
        },
        lastName: {
            label: t('account.register.lastName.label'),
            inputProps: {
                placeholder: t('account.register.lastName.placeholder'),
            }
        },
        company: {
            label: t('account.register.company.label'),
            inputProps: {
                placeholder: t('account.register.company.placeholder'),
            }
        },
        department: {
            label: t('account.register.department.label'),
            inputProps: {
                placeholder: t('account.register.department.placeholder'),
            }
        },
        street: {
            label: t('account.register.address.label'),
            inputProps: {
                placeholder: t('account.register.address.placeholder'),
            }
        },
        zipcode: {
            label: t('account.register.postalCode.label'),
            inputProps: {
                placeholder: t('account.register.postalCode.placeholder'),
            }
        },
        city: {
            label: t('account.register.city.label'),
            inputProps: {
                placeholder: t('account.register.city.placeholder'),
            }
        },
        additionalAddressLine1: {
            label: t('account.register.additionalAddressLine1.label'),
            inputProps: {
                placeholder: t('account.register.additionalAddressLine1.placeholder'),
            }
        },
        additionalAddressLine2: {
            label: t('account.register.additionalAddressLine2.label'),
            inputProps: {
                placeholder: t('account.register.additionalAddressLine2.placeholder'),
            }
        },
        countryId: {
            label: t('account.register.country.label'),
            inputProps: {
                placeholder: t('account.register.country.placeholder'),
            }
        },
        countryState: {
            label: t('account.register.state.label'),
            inputProps: {
                placeholder: t('account.register.state.placeholder'),
            }
        },
        phoneNumber: {
            label: t('account.register.phone.label'),
            inputProps: {
                placeholder: t('account.register.phone.placeholder'),
            }
        },
    },
    acceptedDataProtection: {
        label: t('account.register.tos.label'),
    }
}

// Remove all formFields which are not enabled in the admin area
const calculatedSchema = computed(() => {
    let omittedAddress: {
        accountType: true | undefined
        company: true | undefined
        department: true | undefined
        vatNumber: true | undefined
        additionalAddressLine1: true | undefined
        additionalAddressLine2: true | undefined
    } = {
        accountType: !configStore.get('core.loginRegistration.showAccountTypeSelection') || undefined,
        company: !configStore.get('core.loginRegistration.showAccountTypeSelection') || undefined,
        department: !configStore.get('core.loginRegistration.showAccountTypeSelection') || undefined,
        vatNumber: !configStore.get('core.loginRegistration.showAccountTypeSelection') || undefined,
        additionalAddressLine1: !configStore.get('core.loginRegistration.showAdditionalAddressField1') || undefined,
        additionalAddressLine2: !configStore.get('core.loginRegistration.showAdditionalAddressField2') || undefined,
    };
    // TODO: Typing problems
    const calculatedAddressSchema = addressFieldSchema.omit(omittedAddress);

    let schema = generalFieldSchema
        .merge(shortAddressFieldSchema)
        .merge(z.object({
            shippingAddress: calculatedAddressSchema
        }))
        .merge(tosSchema);

    let omittedGeneral: {
        accountType: true | undefined
        company: true | undefined
        department: true | undefined
        vatNumber: true | undefined
        title: true | undefined
        birthdate: true | undefined
        confirmPassword: true | undefined
        additionalAddressLine1: true | undefined
        additionalAddressLine2: true | undefined
        confirmMail: true | undefined
    } = {
        accountType: !configStore.get('core.loginRegistration.showAccountTypeSelection') || undefined,
        company: !configStore.get('core.loginRegistration.showAccountTypeSelection') || undefined,
        department: !configStore.get('core.loginRegistration.showAccountTypeSelection') || undefined,
        vatNumber: !configStore.get('core.loginRegistration.showAccountTypeSelection') || undefined,
        title: !configStore.get('core.loginRegistration.showTitleField') || undefined,
        birthdate: !configStore.get('core.loginRegistration.showBirthdayField') || undefined,
        confirmPassword: !configStore.get('core.loginRegistration.requirePasswordConfirmation') || undefined,
        additionalAddressLine1: !configStore.get('core.loginRegistration.showAdditionalAddressField1') || undefined,
        additionalAddressLine2: !configStore.get('core.loginRegistration.showAdditionalAddressField2') || undefined,
        confirmMail: !configStore.get('core.loginRegistration.requireEmailConfirmation') || undefined,
    };

    // TODO: Omit fields in nested shippingAddressSchema
    // refine and superRefine might not work due dynamic fields
    // pls refer to here: https://github.com/logaretm/vee-validate/issues/4338
    // TODO: Implement alternative to superRefine, because partial will alter the schema to a non-usable state
    // TODO: Omit tempers with types resulting in TS errors
    return schema.omit(omittedGeneral);

    // return schema.superRefine((data, context) => {
    //     if (configStore.get('core.loginRegistration.requirePasswordConfirmation')) {
    //         if (!data.confirmPassword || data.password !== data.confirmPassword) {
    //             context.addIssue({
    //                 code: z.ZodIssueCode.custom,
    //                 message: t('account.register.password.confirm.errorGeneral'),
    //                 path: ['confirmPassword']
    //             })
    //         }
    //     }
    //     if (configStore.get('core.loginRegistration.requireEmailConfirmation')) {
    //         if (data.email !== data.confirmMail) {
    //             context.addIssue({
    //                 code: z.ZodIssueCode.custom,
    //                 message: t('account.register.email.confirm.errorGeneral'),
    //                 path: ['confirmMail']
    //             })
    //         }
    //     }
    // });
});

export type RegisterData = z.infer<typeof calculatedSchema.value>;

const form = useForm({
    validationSchema: toTypedSchema(calculatedSchema.value),
})

const dependencies = computed(() => {
    // TODO: Fix typing
    let dependencies = [];
    dependencies.push({
        sourceField: 'deliveryAddressVaries',
        type: DependencyType.HIDES,
        targetField: 'shippingAddress',
        when: (deliveryAddressVaries: boolean) =>
            !deliveryAddressVaries
    });
    if (configStore.get('core.loginRegistration.showAccountTypeSelection')) {
        dependencies.push(
            {
                sourceField: 'accountType',
                type: DependencyType.HIDES,
                targetField: 'company',
                when: (accountType: string) =>
                    accountType !== accountTypes.business.value
            }
        );
        dependencies.push(
            {
                sourceField: 'accountType',
                type: DependencyType.HIDES,
                targetField: 'department',
                when: (accountType: string) =>
                    accountType !== accountTypes.business.value
            }
        );
        dependencies.push(
            {
                sourceField: 'accountType',
                type: DependencyType.HIDES,
                targetField: 'vatNumber',
                when: (accountType: string) =>
                    accountType !== accountTypes.business.value
            },
        );
        dependencies.push(
            {
                sourceField: 'shippingAddress.accountType',
                type: DependencyType.HIDES,
                targetField: 'shippingAddress.company',
                when: (accountType: string) =>
                    accountType !== accountTypes.business.value
            }
        );
        dependencies.push(
            {
                sourceField: 'shippingAddress.accountType',
                type: DependencyType.HIDES,
                targetField: 'shippingAddress.department',
                when: (accountType: string) =>
                    accountType !== accountTypes.business.value
            }
        );
    }

    return dependencies;
});

const register = async (registerData: RegisterData) => {
    emits('register', registerData);
};

// Updates current states if selected country has any
watch(form.values, (values) => {
    if (!values.countryId) {
        return;
    }
    states.value = getStatesForCountry(values.countryId);
});

// API fetches
onBeforeMount(async () => {
    await configStore.loadConfig();
    await fetchSalutations();
    salutations.value = getSalutations.value;
    await fetchCountries();
    countries.value = getCountries.value;
});
</script>

<template>
    <UiAutoForm
        class="space-y-6"
        :form="form"
        :schema="calculatedSchema"
        :field-config="fieldConfig"
        :dependencies="dependencies"
        @submit="register"
    >
        <template #headerMain>
            <slot name="registerHeader">
                <div>
                    <h1 class="text-xl font-semibold">{{ $t('account.register.header.main') }}</h1>
                </div>
            </slot>
        </template>
        <template #headerGeneral>
            <slot name="registerGeneralFieldsHeader">
                <div>
                    <h2 class="text-lg font-semibold">{{ $t('account.register.header.generalFields') }}</h2>
                    <hr>
                </div>
            </slot>
        </template>
        <template #headerAddress>
            <slot name="registerAddressFieldsHeader">
                <div class="pt-6">
                    <h2 class="text-lg font-semibold">{{ $t('account.register.header.addressFields') }}</h2>
                    <hr>
                </div>
            </slot>
        </template>
        <template #accountType>
            <FormField v-slot="{ componentField }" name="accountType">
                <UiFormItem>
                    <UiAutoFormLabel required>{{ $t('account.register.accountTypes.label') }}</UiAutoFormLabel>
                    <UiSelect v-bind="componentField">
                        <UiFormControl>
                            <UiSelectTrigger>
                                <UiSelectValue :placeholder="$t('account.register.accountTypes.placeholder')"/>
                            </UiSelectTrigger>
                        </UiFormControl>
                        <UiSelectContent>
                            <UiSelectGroup>
                                <UiSelectItem
                                    v-for="accountType in accountTypes"
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
        </template>
        <template #salutationId>
            <FormField v-slot="{ componentField }" name="salutationId">
                <UiFormItem>
                    <UiAutoFormLabel required>{{ $t('account.register.salutations.label') }}</UiAutoFormLabel>
                    <UiSelect v-bind="componentField">
                        <UiFormControl>
                            <UiSelectTrigger>
                                <UiSelectValue :placeholder="$t('account.register.salutations.placeholder')"/>
                            </UiSelectTrigger>
                        </UiFormControl>
                        <UiSelectContent>
                            <UiSelectGroup>
                                <UiSelectItem
                                    v-for="salutation in salutations"
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
        </template>
        <template #countryId>
            <FormField v-slot="{ componentField }" name="countryId">
                <UiFormItem>
                    <UiAutoFormLabel required>{{ $t('account.register.country.label') }}</UiAutoFormLabel>
                    <UiSelect v-bind="componentField">
                        <UiFormControl>
                            <UiSelectTrigger>
                                <UiSelectValue :placeholder="$t('account.register.country.placeholder')"/>
                            </UiSelectTrigger>
                        </UiFormControl>
                        <UiSelectContent>
                            <UiSelectGroup>
                                <UiSelectItem
                                    v-for="country in countries"
                                    :value="country.id"
                                >
                                    {{ country.translated.name }}
                                </UiSelectItem>
                            </UiSelectGroup>
                        </UiSelectContent>
                    </UiSelect>
                    <UiFormMessage/>
                </UiFormItem>
            </FormField>
        </template>
        <template #countryState>
            <div v-if="states && states.length > 0">
                <FormField v-slot="{ componentField }" name="countryState">
                    <UiFormItem>
                        <UiAutoFormLabel>{{ $t('account.register.state.label') }}</UiAutoFormLabel>
                        <UiSelect v-bind="componentField">
                            <UiFormControl>
                                <UiSelectTrigger>
                                    <UiSelectValue :placeholder="$t('account.register.state.placeholder')"/>
                                </UiSelectTrigger>
                            </UiFormControl>
                            <UiSelectContent>
                                <UiSelectGroup>
                                    <UiSelectItem
                                        v-for="state in states"
                                        :value="state.id"
                                    >
                                        {{ state.translated.name }}
                                    </UiSelectItem>
                                </UiSelectGroup>
                            </UiSelectContent>
                        </UiSelect>
                    </UiFormItem>
                </FormField>
            </div>
            <div v-else></div>
        </template>
        <!-- TODO: Implement shippingAddress.state template -->
        <!-- TODO: Add hidden-Input field for storefrontUrl -->
        <template #acceptedDataProtection="slotProps">
            <div class="pt-6">
                <UiLabel class="font-bold">{{ $t('account.register.tos.header') }}</UiLabel>
                <UiAutoFormField v-if="configStore.get('core.loginRegistration.requireDataProtectionCheckbox')"
                                 v-bind="slotProps"/>
                <UiLabel v-else>{{ $t('account.register.tos.label') }}</UiLabel>
            </div>
        </template>
        <slot name="submit-btn">
            <UiButton
                type="submit"
                :is-loading="isLoading"
            >
                {{ $t('account.register.submit') }}
            </UiButton>
        </slot>
    </UiAutoForm>
</template>
