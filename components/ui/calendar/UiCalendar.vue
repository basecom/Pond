<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { CalendarRoot, type CalendarRootEmits, type CalendarRootProps, useForwardPropsEmits } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<CalendarRootProps & { class?: HTMLAttributes['class'] }>();

const emits = defineEmits<CalendarRootEmits>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <CalendarRoot
        v-slot="{ grid, weekDays }"
        :class="cn('p-3', props.class)"
        v-bind="forwarded"
    >
        <UiCalendarHeader>
            <UiCalendarPrevButton />
            <UiCalendarHeading />
            <UiCalendarNextButton />
        </UiCalendarHeader>

        <div class="mt-4 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
            <UiCalendarGrid v-for="month in grid" :key="month.value.toString()">
                <UiCalendarGridHead>
                    <UiCalendarGridRow>
                        <UiCalendarHeadCell
                            v-for="day in weekDays"
                            :key="day"
                        >
                            {{ day }}
                        </UiCalendarHeadCell>
                    </UiCalendarGridRow>
                </UiCalendarGridHead>
                <UiCalendarGridBody>
                    <UiCalendarGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`" class="mt-2 w-full">
                        <UiCalendarCell
                            v-for="weekDate in weekDates"
                            :key="weekDate.toString()"
                            :date="weekDate"
                        >
                            <UiCalendarCellTrigger
                                :day="weekDate"
                                :month="month.value"
                            />
                        </UiCalendarCell>
                    </UiCalendarGridRow>
                </UiCalendarGridBody>
            </UiCalendarGrid>
        </div>
    </CalendarRoot>
</template>
