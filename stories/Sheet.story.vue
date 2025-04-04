<script setup lang="ts">
type Side = 'top'| 'right' | 'bottom' | 'left';
const sides = ['top', 'right', 'bottom', 'left'] as Side[];
</script>

<template>
    <div class="grid grid-cols-2 gap-2">
        <UiSheet v-for="side in sides" :key="side">
            <UiSheetTrigger as-child>
                <UiButton>
                    {{ side }}
                </UiButton>
            </UiSheetTrigger>
      
            <UiSheetContent :side="side">
                <UiSheetHeader>
                    <UiSheetTitle>A Day at the Pond Awaits</UiSheetTitle>
                    <UiSheetDescription>
                        Get ready for a peaceful escape by the water. Your next visit to the pond is just around the corner!
                    </UiSheetDescription>
                </UiSheetHeader>

                <div class="grid gap-4 py-4">
                    Whether you’re here to relax, observe the wildlife, or take a quiet stroll, the pond offers a perfect place to unwind. Enjoy the beauty of nature, listen to the sounds of the water, and let the serenity take over.
                </div>
        
                <UiSheetFooter>
                    <UiSheetClose as-child>
                        <UiButton type="submit">
                            Sounds Great, Let’s Go!
                        </UiButton>
                    </UiSheetClose>
                </UiSheetFooter>
            </UiSheetContent>
        </UiSheet>
    </div>
</template>
