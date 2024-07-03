<script setup lang="ts">
import { PromptRecord } from '@models/prompts/prompt-record';
import { applyPrompt, sendPrompt } from '@messages/prompt-message';
import EditPromptButton from '@components/buttons/EditPromptButton.vue';
import IconButton from '@components/common/IconButton.vue';
const props = defineProps<{ categoryId: string; record: PromptRecord }>();

async function apply() {
  applyPrompt(props.record.prompt);
}
async function send() {
  sendPrompt(props.record.prompt);
}
</script>
<template>
  <tr class="prompt-row">
    <td class="apply-cell icon-cell">
      <IconButton
        icon="prompt_suggestion"
        @click="apply"
        tooltip="挿入して確定"
      />
    </td>
    <td class="send-cell icon-cell">
      <IconButton icon="data_object" @click="send" tooltip="強調挿入" />
    </td>
    <td class="prompt-cell main-cell">{{ record.prompt }}</td>
    <td class="description-cell main-cell">{{ record.description }}</td>
    <td class="edit-cell icon-cell">
      <EditPromptButton :category-id="categoryId" :record="record" />
    </td>
  </tr>
</template>
<style scoped lang="scss">
.prompt-row {
  padding: 0;
  border: solid 1px var(--light-color);
  .main-cell {
    padding: 0.5rem;
  }
  .prompt-cell {
    border-right: solid 1px var(--light-color);
  }
  .description-cell {
    width: 25%;
  }
  .icon-cell {
    width: 30px;
  }
}
</style>
