<script setup lang="ts">
import { useEventBus } from '@vueuse/core';
import { addPromptEventKey } from '@common/events';
import IconButton from '@components/common/IconButton.vue';

const { emit } = useEventBus(addPromptEventKey);
</script>
<template>
  <IconButton
    icon="playlist_add"
    @click.stop="emit()"
    tooltip="プロンプトの追加"
  />
</template>
