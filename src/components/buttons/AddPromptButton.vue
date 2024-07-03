<script setup lang="ts">
import { addPromptEventKey } from '@common/events';
import IconButton from '@components/common/IconButton.vue';
import { useEventBus } from '@vueuse/core';

const { emit } = useEventBus(addPromptEventKey);
</script>
<template>
  <IconButton
    icon="playlist_add"
    @click.stop="emit()"
    tooltip="プロンプトの追加"
  />
</template>
