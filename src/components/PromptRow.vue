<script setup lang="ts">
import IconButton from './parts/IconButton.vue';
import { PromptRecord } from '../data/prompt-record';
const props = defineProps<{ record: PromptRecord }>();

async function apply() {
  const tab = await chrome?.tabs?.query({ active: true, currentWindow: true });
  if (tab && tab[0]?.id) {
    chrome.tabs.sendMessage(tab[0].id, props.record.prompt);
  }
}
</script>
<template>
  <tr class="prompt-row">
    <td class="apply-cell icon-cell">
      <IconButton icon="prompt_suggestion" @click="apply" />
    </td>
    <td class="prompt-cell main-cell">{{ record.prompt }}</td>
    <td class="description-cell main-cell">{{ record.description }}</td>
    <td class="edit-cell icon-cell"><IconButton icon="edit" /></td>
  </tr>
</template>
<style scoped lang="scss">
.prompt-row {
  padding: 0;
  border: solid 1px var(--sub-color);
  .main-cell {
    padding: 0.5rem;
  }
  .prompt-cell {
    border-right: solid 1px var(--sub-color);
  }
  .description-cell {
    width: 30%;
  }
  .icon-cell {
    width: 30px;
  }
}
</style>
