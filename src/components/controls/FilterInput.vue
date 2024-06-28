<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import IconButton from '../parts/IconButton.vue';

const inputText = ref<string | undefined>();
const emit = defineEmits<{ update: [val: string[]] }>();
watch(
  inputText,
  useDebounceFn(
    (val: string | undefined) => {
      const list = val?.split(' ').filter((s) => s !== '') ?? [];
      emit('update', list);
    },
    50,
    { maxWait: 500 },
  ),
);

import { useEventBus } from '@vueuse/core';
import { expandTogleEventKey } from '../../events';
const expandAll = ref(false);
const { emit: expandEmit } = useEventBus(expandTogleEventKey);
function onToggleExpand() {
  expandAll.value = !expandAll.value;
  expandEmit({ expand: expandAll.value });
}
const expandIcon = computed(() =>
  expandAll.value ? 'shadow_minus' : 'shadow_add',
);
</script>
<template>
  <div class="search-input">
    <div class="expand-all">
      <IconButton :icon="expandIcon" @click="onToggleExpand" />
    </div>
    <input
      class="input"
      type="search"
      placeholder="絞り込み…"
      v-model="inputText"
    />
  </div>
</template>
<style scoped lang="scss">
.search-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.expand-all {
  margin-left: 0.5rem;
}
.input {
  border-radius: 5px;
  padding: 5px;
  border: solid 1px var(--light-color);
  &:focus {
    outline: solid 1px var(--sub-color);
  }
  &::placeholder {
    color: var(--light-color);
  }
}
</style>
