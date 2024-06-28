<script setup lang="ts">
import { computed, ref } from 'vue';
import { PromptRecord } from '../data/prompt-record';
import { useEventBus } from '@vueuse/core';
import { expandTogleEventKey, newPromptEventKey } from '../events';
import PromptRow from './PromptRow.vue';
import VuSlideUpDown from 'vue-slide-up-down';
import IconButton from './parts/IconButton.vue';

const props = defineProps<{
  id: string;
  category: string;
  records: PromptRecord[];
  filter?: string[];
}>();

const expand = ref(false);
const icon = computed(() => (expand.value ? 'remove' : 'add'));
function toggleExpand() {
  expand.value = !expand.value;
}

const { on } = useEventBus(expandTogleEventKey);
on((ev) => (expand.value = ev.expand));

const filterdRecords = computed(() => {
  if (props.filter) {
    const fl = props.filter;
    return props.records.filter((val) =>
      fl.every((f) => val.prompt.includes(f) || val.description.includes(f)),
    );
  } else {
    return props.records;
  }
});

const hasRecords = computed(() => filterdRecords.value.length > 0);
const { emit } = useEventBus(newPromptEventKey);

function onAdd() {
  emit({ categoryId: props.id });
}
</script>
<template>
  <div class="prompt-box" v-if="hasRecords">
    <div class="category" @click="toggleExpand">
      <div class="material-symbols-outlined md-18 accordion-button">
        {{ icon }}
      </div>
      <div>{{ category }}</div>
      <div class="add-icon-area">
        <IconButton icon="playlist_add" @click.stop="onAdd" />
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
    .add-icon-area {
      margin-left: auto;
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
