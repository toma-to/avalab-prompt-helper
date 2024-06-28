<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CategoryRecord } from './data/category-record';
import { loadRecords } from './data/data-store';
import PromptBox from './components/PromptBox.vue';
import HeaderArea from './components/header/HeaderArea.vue';

const records = ref<CategoryRecord[]>([]);
onMounted(async () => {
  records.value = await loadRecords();
});

import { useEventBus } from '@vueuse/core';
import { importEventKey } from './events';

const { on: onImport } = useEventBus(importEventKey);
onImport((ev) => {
  records.value = ev.records;
});
</script>

<template>
  <div class="main">
    <HeaderArea />
    <PromptBox
      v-for="record in records"
      :records="record.prompts"
      :category="record.name"
    />
  </div>
</template>

<style scoped lang="scss">
.main {
  padding-top: 3.5rem;
}
</style>
