<script setup lang="ts">
import IconButton from './parts/IconButton.vue';
import { PromptRecord } from '../data/prompt-record';
import { ContentScriptMessage } from '../data/content-script-message';
const props = defineProps<{ record: PromptRecord }>();

async function sendMessage(message: ContentScriptMessage) {
  const tab = await chrome?.tabs?.query({ active: true, currentWindow: true });
  if (tab && tab[0]?.id) {
    chrome.tabs.sendMessage(tab[0].id, message);
  }
}

async function apply() {
  await sendMessage({
    submit: true,
    prompt: props.record.prompt,
  });
}
async function send() {
  const prompts = props.record.prompt
    .split(',')
    .map((val) => (val.startsWith('(') ? val + ',' : `(${val}),`));

  await sendMessage({
    submit: false,
    prompt: prompts.join(''),
  });
}
</script>
<template>
  <tr class="prompt-row">
    <td class="apply-cell icon-cell">
      <IconButton icon="prompt_suggestion" @click="apply" />
    </td>
    <td class="send-cell icon-cell">
      <IconButton icon="data_object" @click="send" />
    </td>
    <td class="prompt-cell main-cell">{{ record.prompt }}</td>
    <td class="description-cell main-cell">{{ record.description }}</td>
    <td class="edit-cell icon-cell"><IconButton icon="edit" /></td>
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
