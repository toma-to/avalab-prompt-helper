<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEventBus } from '@vueuse/core';
import VuSlideUpDown from 'vue-slide-up-down';
import { PromptRecord } from '@models/prompts/prompt-record';
import { uncategorizedCategoryId } from '@common/constants';
import { expandToggleEventKey, promptFilterEventKey } from '@common/events';
import PromptRow from '@components/prompt-view/PromptRow.vue';

const props = defineProps<{
  id: string;
  category: string;
  records: PromptRecord[];
}>();

const expand = ref(false);
const icon = computed(() => (expand.value ? 'remove' : 'add'));
function toggleExpand() {
  expand.value = !expand.value;
}

const labelClass = computed(() => {
  const classes: string[] = [];
  if (props.id === uncategorizedCategoryId) {
    classes.push('uncategorized-label');
  }
  return classes;
});

const { on: onExpand } = useEventBus(expandToggleEventKey);
onExpand((ev) => (expand.value = ev.expand));

const filters = ref<string[]>([]);
const { on: onFilter } = useEventBus(promptFilterEventKey);
onFilter((ev) => (filters.value = ev.filters));

const filterdRecords = computed(() => {
  if (filters.value.length > 0) {
    return props.records.filter((val) =>
      filters.value.every(
        (f) => val.prompt.includes(f) || val.description.includes(f),
      ),
    );
  } else {
    return props.records;
  }
});

const hasRecords = computed(() => filterdRecords.value.length > 0);
</script>
<template>
  <div class="prompt-box" v-if="hasRecords">
    <div class="category" @click="toggleExpand">
      <div class="material-symbols-outlined md-18 accordion-button">
        {{ icon }}
      </div>
      <div>
        <span :class="labelClass">{{ category }}</span>
      </div>
    </div>
    <VuSlideUpDown :active="expand" :duration="200">
      <table class="prompt-table">
        <tbody>
          <PromptRow
            v-for="record in filterdRecords"
            :key="record.id"
            :record="record"
            :category-id="id"
          />
        </tbody>
      </table>
    </VuSlideUpDown>
  </div>
</template>
<style scoped lang="scss">
.prompt-box {
  margin: 0.5rem;
  background-color: var(--sub-bg-color);
  .category {
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    .accordion-button {
      color: var(--sub-color);
    }
  }
}
.prompt-table {
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  width: calc(100% - 2rem);
  margin-left: 2rem;
  border: solid 1px var(--light-color);
  overflow-wrap: anywhere;
}
</style>
