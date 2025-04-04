<script setup lang="ts">
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>;
</script>

<template>
    <div class="w-fit">
        <UiCalendar v-model="value" weekday-format="short" class="rounded-md border" />
    </div>
</template>
