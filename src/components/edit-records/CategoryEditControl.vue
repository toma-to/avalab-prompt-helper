<script setup lang="ts">
import { uncategorizedCategoryId } from '@common/constants';
import { ref } from 'vue';
import { CategoryRecord } from '@models/prompts/category-record';
import { storeRecordsRef } from '@models/prompts/data-store';
import { useEventBus } from '@vueuse/core';
import { editCategoryEventKey } from '@common/events';
import CategoryDialog, { DialogData } from './dialogs/CategoryDialog.vue';

const model = defineModel<CategoryRecord[]>({ required: true });

// カテゴリ編集
const categoryDialogRef = ref<InstanceType<typeof CategoryDialog> | null>(null);

const { on } = useEventBus(editCategoryEventKey);
on(async () => {
  const input: DialogData[] = model.value
    .filter((val) => val.id !== uncategorizedCategoryId)
    .map((val) => ({
      categoryId: val.id,
      categoryName: val.name,
    }));
  const result = (await categoryDialogRef.value?.modal(input)) ?? null;
  if (!result) {
    return;
  }
  const exists = new Set<string>();
  const newList: CategoryRecord[] = [];
  for (const record of result) {
    const current = model.value.find((val) => val.id === record.categoryId) ?? {
      id: record.categoryId,
      name: record.categoryName,
      prompts: [],
    };
    current.name = record.categoryName;
    newList.push(current);
    exists.add(current.id);
  }
  const uncategorized = model.value.find(
    (val) => val.id === uncategorizedCategoryId,
  ) ?? { id: uncategorizedCategoryId, name: '未分類', prompts: [] };
  for (const old of model.value.filter(
    (val) => val.id !== uncategorizedCategoryId,
  )) {
    if (!exists.has(old.id)) {
      uncategorized.prompts.push(...old.prompts);
    }
  }
  if (uncategorized.prompts.length > 0) {
    newList.push(uncategorized);
  }
  model.value = newList;
  await storeRecordsRef(model);
});
</script>
<template>
  <CategoryDialog ref="categoryDialogRef" />
</template>
