<script setup lang="ts">
import { importEventKey } from '@common/events';
import IconButton from '@components/common/IconButton.vue';
import { useEventBus } from '@vueuse/core';

const { emit } = useEventBus(importEventKey);
</script>
<template>
  <IconButton icon="upload" @click="emit()" tooltip="インポート" />
</template>
