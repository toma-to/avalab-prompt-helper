<script setup lang="ts">
import IconButton from '@components/common/IconButton.vue';

function openOptions() {
  chrome.runtime?.openOptionsPage();
}
</script>
<template>
  <IconButton icon="settings" tooltip="設定" @click="openOptions" />
</template>
