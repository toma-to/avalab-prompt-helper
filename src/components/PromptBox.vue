<script setup lang="ts">
import { PromptRecord } from '../data/prompt-record';
import PromptRow from './PromptRow.vue';

defineProps<{ category: string; records: PromptRecord[] }>();
</script>
<template>
  <div class="prompt-box">
    <div class="category">
      <div class="material-symbols-outlined md-18 accordion-button">remove</div>
      <div>{{ category }}</div>
    </div>
    <table class="prompt-table">
      <tbody>
        <PromptRow
          v-for="record in records"
          :key="record.id"
          :record="record"
        />
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="scss">
.prompt-box {
  margin: 0.5rem;
  background-color: var(--sub-bg-color);
  .category {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    .accordion-button {
      cursor: pointer;
      color: var(--sub-color);
    }
  }
}
.prompt-table {
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  width: calc(100% - 2rem);
  margin-left: 2rem;
  border: solid 1px var(--sub-color);
  overflow-wrap: anywhere;
}
</style>
