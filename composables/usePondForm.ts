import * as z from 'zod';
import type { Schemas } from '@shopware/api-client/api-types';
import { DependencyType, type Dependency } from '../components/ui/auto-form/interface';
import type { ZodObjectOrWrapped } from '~/components/ui/auto-form/utils';

export const usePondForm = () => {
    const configStore = useConfigStore();
    const { getSalutations } = useSalutations();

    const salutations = computed(() => getSalutations.value.map((salutation: Schemas['Salutation']) => salutation.displayName));

    const getPersonalDataForm = (): ZodObjectOrWrapped => {
        let personalDataForm = z.object({});

        // add selection of account type
        const showAccountType = configStore.get('core.loginRegistration.showAccountTypeSelection') as boolean;
        if (showAccountType) {
            personalDataForm = personalDataForm.extend({
                accountType: z.enum(['business', 'private']).optional().default('business'),
            });
        }

        if (salutations.value) {
            personalDataForm = personalDataForm.extend({
                salutation: z.enum(salutations.value).optional().default('Herr'),
            });
        }

        // add title (if set in the admin)
        const showTitle = configStore.get('core.loginRegistration.showTitleField') as boolean;
        if (showTitle) {
            personalDataForm = personalDataForm.extend({
                title: z.string().optional(),
            });
        }

        // add fields we always have (first name, last name)
        personalDataForm = personalDataForm.extend({
            firstName: z.string(),
            lastName: z.string(),
        });

        // add company and vat number (if we can select the account type)
        if (showAccountType) {
            personalDataForm = personalDataForm.extend({
                company: z.string(),
                vatNumber: z.string().optional(),
            });
        }

        // add birthday (if set in the admin)
        const showBirthday = configStore.get('core.loginRegistration.showBirthdayField') as boolean;
        if (showBirthday) {
            personalDataForm = personalDataForm.extend({
                birthday: z.date().optional(),
            });
        }

        return personalDataForm;
    };

     
    // @ts-nocheck
    /* eslint-disable */
    const getPersonalDataDependencies = (): Dependency<{ [x: string]: any; }>[] => [
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
