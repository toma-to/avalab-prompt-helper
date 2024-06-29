<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CategoryRecord } from './data/category-record';
import { loadRecords, storeRecordsRef } from './data/data-store';
import PromptBox from './components/PromptBox.vue';
import HeaderArea from './components/header/HeaderArea.vue';
import FilterInput from './components/controls/FilterInput.vue';
import PromptEditDialog from './components/controls/PromptEditDialog.vue';
import CategoryDialog, {
  DialogData as CategoryDialogData,
} from './components/controls/CategoryDialog.vue';

const records = ref<CategoryRecord[]>([]);
onMounted(async () => {
  records.value = await loadRecords();
});

const filter = ref<string[]>([]);
function onFilterUpdate(val: string[]) {
  filter.value = val;
}

import { useEventBus } from '@vueuse/core';
import {
  editPromptEventKey,
  importEventKey,
  newPromptEventKey,
} from './events';

const { on: onImport } = useEventBus(importEventKey);
onImport((ev) => {
  records.value = ev.records;
});

// プロンプト編集
const promptEditDialogRef = ref<InstanceType<typeof PromptEditDialog> | null>(
  null,
);
const { on: onEditPrompt } = useEventBus(editPromptEventKey);
onEditPrompt(async (ev) => {
  const result = (await promptEditDialogRef.value?.modal(ev.target)) ?? null;
  if (result) {
    if (result === 'delete') {
      const categoy = records.value.find((val) => val.id === ev.categoryId);
      if (categoy) {
        categoy.prompts = categoy.prompts.filter(
          (val) => val.id != ev.target.id,
        );
      }
    } else {
      ev.target.prompt = result.prompt;
      ev.target.description = result.description;
    }
    await storeRecordsRef(records);
  }
});
const { on: onNewPrompt } = useEventBus(newPromptEventKey);
onNewPrompt(async (ev) => {
  const result = (await promptEditDialogRef.value?.modal()) ?? null;
  if (result && result !== 'delete') {
    const categoy = records.value.find((val) => val.id === ev.categoryId);
    if (categoy) {
      categoy.prompts.push({
        id: crypto.randomUUID(),
        prompt: result.prompt,
        description: result.description,
      });
    }
    await storeRecordsRef(records);
  }
});

// カテゴリ編集
const categoryDialogRef = ref<InstanceType<typeof CategoryDialog> | null>(null);
async function onEditCategory() {
  const input: CategoryDialogData[] = records.value.map((val) => ({
    categoryId: val.id,
    categoryName: val.name,
  }));
  const result = (await categoryDialogRef.value?.modal(input)) ?? null;
  if (result) {
    const newList: CategoryRecord[] = [];
    for (const record of result) {
      const current = records.value.find(
        (val) => val.id === record.categoryId,
      ) ?? {
        id: record.categoryId,
        name: record.categoryName,
        prompts: [
          {
            id: crypto.randomUUID(),
            prompt: '',
            description: 'プロンプトを設定してください。',
          },
        ],
      };
      current.name = record.categoryName;
      newList.push(current);
    }
    records.value = newList;
    await storeRecordsRef(records);
  }
}
</script>

<template>
  <div class="main">
    <CategoryDialog ref="categoryDialogRef" />
    <PromptEditDialog ref="promptEditDialogRef" />
    <HeaderArea @category-edit="onEditCategory" />
    <FilterInput class="filter-input" @update="onFilterUpdate" />
    <PromptBox
      v-for="record in records"
      :key="record.id"
      :id="record.id"
      :records="record.prompts"
      :category="record.name"
      :filter="filter"
    />
  </div>
</template>

<style scoped lang="scss">
.main {
  padding-top: 3.5rem;
}
.filter-input {
  margin-right: 1rem;
}
</style>
