<script setup lang="ts">
import { ref, watch } from 'vue';
import { useEventBus, useThrottleFn } from '@vueuse/core';
import { promptFilterEventKey } from '@common/events';

const inputText = ref<string | undefined>();

const { emit } = useEventBus(promptFilterEventKey);

watch(
  inputText,
  useThrottleFn(
    (val: string | undefined) => {
      const list = val?.split(' ').filter((s) => s !== '') ?? [];
      emit({ filters: list });
    },
    300,
    true,
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
