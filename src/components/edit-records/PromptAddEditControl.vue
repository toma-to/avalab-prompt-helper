<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEventBus } from '@vueuse/core';
import { CategoryRecord } from '@models/prompts/category-record';
import { storeRecordsRef } from '@models/prompts/data-store';
import { uncategorizedCategoryId } from '@common/constants';
import { addPromptEventKey, editPromptEventKey } from '@common/events';
import PromptEditDialog from './dialogs/PromptEditDialog.vue';

const model = defineModel<CategoryRecord[]>({ required: true });

const categoryList = computed(() =>
  model.value.filter((val) => val.id !== uncategorizedCategoryId),
);

const promptEditDialogRef = ref<InstanceType<typeof PromptEditDialog> | null>(
  null,
);

// プロンプト編集
const { on: onEditPrompt } = useEventBus(editPromptEventKey);
onEditPrompt(async (ev) => {
  const result =
    (await promptEditDialogRef.value?.modal({
      ...ev.target,
      categoryId: ev.categoryId,
    })) ?? null;
  if (!result) {
    return;
  }
  if (result === 'delete') {
    const categoy = model.value.find((val) => val.id === ev.categoryId);
    if (categoy) {
      categoy.prompts = categoy.prompts.filter((val) => val.id != ev.target.id);
    }
  } else {
    ev.target.prompt = result.prompt;
    ev.target.description = result.description;
    if (ev.categoryId !== result.categoryId) {
      const current = model.value.find((val) => val.id === ev.categoryId);
      const next = model.value.find((val) => val.id === result.categoryId);
      if (current && next) {
        current.prompts = current.prompts.filter(
          (val) => val.id !== ev.target.id,
        );
        next.prompts.push(ev.target);
      }
    }
  }
  await storeRecordsRef(model);
});

// プロンプト追加
const { on: onAddPrompt } = useEventBus(addPromptEventKey);

onAddPrompt(async () => {
  const result = (await promptEditDialogRef.value?.modal()) ?? null;
  if (result && result !== 'delete') {
    const categoy = model.value.find((val) => val.id === result.categoryId);
    if (categoy) {
      categoy.prompts.push({
        id: crypto.randomUUID(),
        prompt: result.prompt,
        description: result.description,
      });
    }
    await storeRecordsRef(model);
  }
});
</script>
<template>
  <PromptEditDialog ref="promptEditDialogRef" :category-list="categoryList" />
</template>
