<script setup lang="ts">
import {type Schemas} from '@shopware/api-client/store-api-types';
import * as z from 'zod';
import {DependencyType} from "~/components/ui/auto-form/interface";
import {toTypedSchema} from '@vee-validate/zod';
import {useForm} from 'vee-validate';

// Composables
const {getSalutations, fetchSalutations} = useSalutations();
const {getCountries, fetchCountries, getStatesForCountry} = useCountries();
const {t} = useI18n();
const configStore = useConfigStore();

// Custom properties
const accountTypes = {
    'private': {label: t('account.register.accountTypes.private'), value: 'private'},
    'business': {label: t('account.register.accountTypes.business'), value: 'business'},
};
//TODO: Implement with correct snippets and labeling

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
const addressFieldSchema = z.object({
    headerAddress: z.void(),
    address: z
        .string({
            required_error: t('account.register.address.error.required')
        })
        .min(3, t('account.register.address.error.general'))
        .regex(
            /^(\d+[a-zA-Z]?(?:-\d+[a-zA-Z]?)?\s[A-Za-zÄÖÜäöüß\s-]+|\b[A-Za-zÄÖÜäöüß\s-]+\s\d+[a-zA-Z]?(?:-\d+[a-zA-Z]?)?\b)$/,
            t('account.register.address.error.general')
        ),
    postalCode: z
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
    country: z
        .string({
            required_error: t('account.register.country.error.required'),
        }),
    state: z.string().optional(),
    phone: configStore.get('core.loginRegistration.phoneNumberFieldRequired')
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
const shippingAddressSchema = z.object({
    shippingAddress: z.object({
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
        address: z
            .string({
                required_error: t('account.register.address.error.required')
            })
            .min(3, t('account.register.address.error.general'))
            .regex(
                /^(\d+[a-zA-Z]?(?:-\d+[a-zA-Z]?)?\s[A-Za-zÄÖÜäöüß\s-]+|\b[A-Za-zÄÖÜäöüß\s-]+\s\d+[a-zA-Z]?(?:-\d+[a-zA-Z]?)?\b)$/,
                t('account.register.address.error.general')
            ),
        postalCode: z
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
        country: z
            .string({
                required_error: t('account.register.country.error.required'),
            }),
        state: z.string(),
        phone: configStore.get('core.loginRegistration.phoneNumberFieldRequired')
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
    })
});

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
    address: {
        label: t('account.register.address.label'),
        inputProps: {
            placeholder: t('account.register.address.placeholder'),
        }
    },
    postalCode: {
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
    phone: {
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
        address: {
            label: t('account.register.address.label'),
            inputProps: {
                placeholder: t('account.register.address.placeholder'),
            }
        },
        postalCode: {
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
        country: {
            label: t('account.register.country.label'),
            inputProps: {
                placeholder: t('account.register.country.placeholder'),
            }
        },
        state: {
            label: t('account.register.state.label'),
            inputProps: {
                placeholder: t('account.register.state.placeholder'),
            }
        },
        phone: {
            label: t('account.register.phone.label'),
            inputProps: {
                placeholder: t('account.register.phone.placeholder'),
            }
        },
    }
}

// Remove all formFields which are not enabled in the admin area
const calculatedSchema = computed(() => {
    let schema = generalFieldSchema
        .merge(addressFieldSchema)
        .merge(shippingAddressSchema);

    let omitted: {
        accountType: true | undefined
        title: true | undefined
        birthdate: true | undefined
        confirmPassword: true | undefined
        additionalAddressLine1: true | undefined
        additionalAddressLine2: true | undefined
        confirmMail: true | undefined
    } = {
        accountType: !configStore.get('core.loginRegistration.showAccountTypeSelection') || undefined,
        title: !configStore.get('core.loginRegistration.showTitleField') || undefined,
        birthdate: !configStore.get('core.loginRegistration.showBirthdayField') || undefined,
        confirmPassword: !configStore.get('core.loginRegistration.requirePasswordConfirmation') || undefined,
        additionalAddressLine1: !configStore.get('core.loginRegistration.showAdditionalAddressField1') || undefined,
        additionalAddressLine2: !configStore.get('core.loginRegistration.showAdditionalAddressField2') || undefined,
        confirmMail: !configStore.get('core.loginRegistration.requireEmailConfirmation') || undefined,
    };
    // TODO: Refines wont work, double check
    // TODO: Omit fields in nested shippingAddressSchema
    // TODO: Omit and Refine temper with types resulting in TS errors
    schema = schema.omit(omitted);
    if (configStore.get('core.loginRegistration.requirePasswordConfirmation')) {
        schema = schema.refine((data) => data.password === data.confirmPassword, {
            message: t('account.register.password.confirm.errorGeneral'),
            path: ['confirmPassword']
        });
    }
    if (configStore.get('core.loginRegistration.requireEmailConfirmation')) {
        schema = schema.refine((data) => data.email === data.confirmMail, {
            message: t('account.register.email.confirm.errorGeneral'),
            path: ['confirmMail']
        });
    }

    return schema;
});

export type RegisterData = z.infer<typeof calculatedSchema.value>;

const form = useForm({
    validationSchema: toTypedSchema(calculatedSchema.value),
})

const dependencies = [
    {
        sourceField: 'accountType',
        type: DependencyType.HIDES,
        targetField: 'company',
        when: (accountType: string) =>
            accountType !== accountTypes.business.value
    },
    {
        sourceField: 'accountType',
        type: DependencyType.HIDES,
        targetField: 'department',
        when: (accountType: string) =>
            accountType !== accountTypes.business.value
    },
    {
        sourceField: 'accountType',
        type: DependencyType.HIDES,
        targetField: 'vatNumber',
        when: (accountType: string) =>
            accountType !== accountTypes.business.value
    },
    {
        sourceField: 'shippingAddress.accountType',
        type: DependencyType.HIDES,
        targetField: 'shippingAddress.company',
        when: (accountType: string) =>
            accountType !== accountTypes.business.value
    },
    {
        sourceField: 'shippingAddress.accountType',
        type: DependencyType.HIDES,
        targetField: 'shippingAddress.department',
        when: (accountType: string) =>
            accountType !== accountTypes.business.value
    },
    {
        sourceField: 'deliveryAddressVaries',
        type: DependencyType.HIDES,
        targetField: 'shippingAddress',
        when: (deliveryAddressVaries: boolean) =>
            !deliveryAddressVaries
    }
];

// Handle Form submit and BE validation
const onSubmit = () => {
    console.log(form.data);
    console.log('submitting all');
};

// Updates current states if selected country has any
watch(form.values, (values) => {
    if (!values.country) {
        return;
    }
    states.value = getStatesForCountry(values.country);
});

// Set up fresh admin config variables and get salutations from admin
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
        <template #country>
            <FormField v-slot="{ componentField }" name="country">
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
        <template #state>
            <div v-if="states && states.length > 0">
                <FormField v-slot="{ componentField }" name="state">
                    <UiFormItem>
                        <UiAutoFormLabel>{{ $t('account.register.state.label') }} d</UiAutoFormLabel>
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
        <UiButton type="submit>">{{ $t('account.register.submit') }}</UiButton>
    </UiAutoForm>
</template>
