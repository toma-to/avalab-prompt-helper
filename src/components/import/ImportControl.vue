<script setup lang="ts">
import { ref } from 'vue';
import { useEventBus } from '@vueuse/core';
import { CategoryRecord } from '@models/prompts/category-record';
import { importEventKey } from '@common/events';
import ImportDialog from './dialog/ImportDialog.vue';

const model = defineModel<CategoryRecord[]>({ required: true });

const importDialogRef = ref<InstanceType<typeof ImportDialog> | null>(null);
const { on } = useEventBus(importEventKey);

on(async () => {
  const result = await importDialogRef.value?.modal();
  if (result) {
    model.value = result;
  }
});
</script>
<template>
  <ImportDialog ref="importDialogRef" />
</template>
