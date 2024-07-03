<script setup lang="ts">
import { editCategoryEventKey } from '@common/events';
import IconButton from '@components/common/IconButton.vue';
import { useEventBus } from '@vueuse/core';

const { emit } = useEventBus(editCategoryEventKey);
</script>
<template>
  <IconButton icon="edit_note" @click="emit()" tooltip="カテゴリ編集" />
</template>
