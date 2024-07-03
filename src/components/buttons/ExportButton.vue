<script setup lang="ts">
import { exportTsv } from '@models/prompts/data-import-export';
import IconButton from '@components/common/IconButton.vue';

async function onExport() {
  await exportTsv();
}
</script>
<template>
  <IconButton icon="download" @click="onExport" tooltip="エクスポート" />
</template>
