<script setup lang="ts">
import { expandToggleEventKey } from '@common/events';
import { useEventBus } from '@vueuse/core';
import { computed, ref } from 'vue';
import IconButton from '@components/common/IconButton.vue';

const expandAll = ref(false);
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
