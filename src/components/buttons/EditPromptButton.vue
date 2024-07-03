<script setup lang="ts">
import { editPromptEventKey } from '@common/events';
import { PromptRecord } from '@models/prompts/prompt-record';
import { useEventBus } from '@vueuse/core';
import IconButton from '@components/common/IconButton.vue';

const props = defineProps<{ categoryId: string; record: PromptRecord }>();

const { emit } = useEventBus(editPromptEventKey);
function onEdit() {
  emit({ target: props.record, categoryId: props.categoryId });
}
</script>
<template>
  <IconButton icon="edit" @click="onEdit" tooltip="プロンプトを編集" />
</template>
