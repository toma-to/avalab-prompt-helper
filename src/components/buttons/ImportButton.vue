<script setup lang="ts">
import { useEventBus } from '@vueuse/core';
import { importEventKey } from '@common/events';
import IconButton from '@components/common/IconButton.vue';

const { emit } = useEventBus(importEventKey);
</script>
<template>
  <IconButton icon="upload" @click="emit()" tooltip="インポート" />
</template>
