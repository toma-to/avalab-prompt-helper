<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { loadOptions, storeOptionsRef } from '@models/options/data-store';
import { Options, optionsDefault } from '@models/options/options';

const options = ref<Options>(optionsDefault);
onMounted(async () => {
  options.value = await loadOptions();
});

watch(
  options,
  useDebounceFn(
    async () => {
      await storeOptionsRef(options);
    },
    50,
    { maxWait: 500 },
  ),
  { deep: true },
);
</script>

<template>
  <div class="main">
    <div class="item">
      <input
        type="checkbox"
        id="hide-prompt-suggest"
        v-model="options.hidePromptSuggest"
      /><label for="hide-prompt-suggest"
        >Avalab.aiのプロンプト入力候補を表示しない</label
      >
    </div>
    <div class="item">
      <input
        type="checkbox"
        id="use-sidepanel"
        v-model="options.useSidePanel"
      /><label for="use-sidepanel">サイドパネルモードで使用する</label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  margin: 1rem;
}
.item {
  margin: 1rem;
}
</style>
