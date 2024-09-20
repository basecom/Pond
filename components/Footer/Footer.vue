<script setup lang="ts">
import { getTranslatedProperty, getCategoryRoute } from '@shopware-pwa/helpers-next';
import FooterNavigation from '~/components/Footer/FooterNavigation.vue';
import FooterServiceNavigation from '~/components/Footer/FooterServiceNavigation.vue';

const { navigationElements, loadNavigationElements } = useNavigation({ type: 'footer-navigation' });
const { navigationElements: serviceNavigationElements, loadNavigationElements: loadServiceElements } = useNavigation({
    type: 'service-navigation',
});

onMounted(async () => {
    await loadNavigationElements({ depth: 1 });
    await loadServiceElements({ depth: 1 });
});
</script>

<template>
    <div class="mt-auto">
        <footer class="mt-4 bg-gray-light md:mt-10">
            <div class="container py-5 md:pb-5 md:pt-10">
                <FooterNavigation :navigation-elements="navigationElements" />

                <LanguageSwitch />

                <!-- footer service navigation -->
                <FooterServiceNavigation :navigation-elements="serviceNavigationElements" />
            </div>
        </footer>
    </div>
</template>
