<script setup lang="ts">
import { promptFilterEventKey } from '@common/events';
import { useDebounceFn, useEventBus } from '@vueuse/core';
import { ref, watch } from 'vue';

const inputText = ref<string | undefined>();

const { emit } = useEventBus(promptFilterEventKey);

watch(
  inputText,
  useDebounceFn(
    (val: string | undefined) => {
      const list = val?.split(' ').filter((s) => s !== '') ?? [];
      emit({ filters: list });
    },
    50,
    { maxWait: 500 },
  ),
);
</script>
<template>
  <input
    class="form-item"
    type="search"
    placeholder="絞り込み…"
    v-model="inputText"
  />
</template>
