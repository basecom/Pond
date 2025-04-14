import * as z from 'zod';
import type { Schemas } from '@shopware/api-client/api-types';
import { DependencyType } from '../components/ui/auto-form/interface';

export const usePondForm = () => {
    const configStore = useConfigStore();
    const { getSalutations } = useSalutations();

    const salutations = computed(() => getSalutations.value.map((salutation: Schemas['Salutation']) => salutation.displayName));

    const getPersonalDataForm = ()  => {
        const personalDataForm = ref(z.object({}));

        // add selection of account type
        const showAccountType = configStore.get('core.loginRegistration.showAccountTypeSelection') as boolean;
        if (showAccountType) {
            personalDataForm.value = personalDataForm.value.extend({
                accountType: z.enum(['business', 'private']).optional().default('business'),
            });
        }

        if (salutations.value) {
            personalDataForm.value = personalDataForm.value.extend({
                salutation: z.enum(salutations.value).optional().default('Herr'),
            });
        }

        // add title (if set in the admin)
        const showTitle = configStore.get('core.loginRegistration.showTitleField') as boolean;
        if (showTitle) {
            personalDataForm.value = personalDataForm.value.extend({
                title: z.string().optional(),
            });
        }

        // add fields we always have (first name, last name)
        personalDataForm.value = personalDataForm.value.extend({
            firstName: z.string(),
            lastName: z.string(),
        });

        // add company and vat number (if we can select the account type)
        if (showAccountType) {
            personalDataForm.value = personalDataForm.value.extend({
                company: z.string(),
                vatNumber: z.string().optional(),
            });
        }

        // add birthday (if set in the admin)
        const showBirthday = configStore.get('core.loginRegistration.showBirthdayField') as boolean;
        if (showBirthday) {
            personalDataForm.value = personalDataForm.value.extend({
                birthday: z.date().optional(),
            });
        }

        return personalDataForm.value;
    };

    const getPersonalDataDependencies = ()  => [
        {
            sourceField: 'accountType',
            type: DependencyType.HIDES,
            targetField: 'vatNumber',
            when: (accountType: string) => accountType !== 'business',
        },
        {
            sourceField: 'accountType',
            type: DependencyType.HIDES,
            targetField: 'company',
            when: (accountType: string) => accountType !== 'business',
        },
    ];

    return {
        getPersonalDataForm,
        getPersonalDataDependencies,
    };
};
