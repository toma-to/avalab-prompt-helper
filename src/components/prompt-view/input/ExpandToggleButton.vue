<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEventBus } from '@vueuse/core';
import { expandNotifyEventKey, expandToggleEventKey } from '@common/events';
import IconButton from '@components/common/IconButton.vue';

const expandAll = ref(false);

const { on: onNotify } = useEventBus(expandNotifyEventKey);
onNotify(() => (expandAll.value = true));

const { emit } = useEventBus(expandToggleEventKey);
function onToggleExpand() {
  expandAll.value = !expandAll.value;
  emit({ expand: expandAll.value });
}
const expandIcon = computed(() =>
  expandAll.value ? 'shadow_minus' : 'shadow_add',
);
</script>
<template>
  <IconButton :icon="expandIcon" @click="onToggleExpand" />
</template>
