<script setup lang="ts">
import { computed, ref } from 'vue';
import { PromptRecord } from '../data/prompt-record';
import PromptRow from './PromptRow.vue';
import VuSlideUpDown from 'vue-slide-up-down';

defineProps<{ category: string; records: PromptRecord[] }>();

const active = ref(true);
const icon = computed(() => (active.value ? 'remove' : 'add'));
function toggleActive() {
  active.value = !active.value;
}
</script>
<template>
  <div class="prompt-box">
    <div class="category">
      <div
        class="material-symbols-outlined md-18 accordion-button"
        @click="toggleActive"
      >
        {{ icon }}
      </div>
      <div>{{ category }}</div>
    </div>
    <VuSlideUpDown :active="active" :duration="200">
      <table class="prompt-table">
        <tbody>
          <PromptRow
            v-for="record in records"
            :key="record.id"
            :record="record"
          />
        </tbody>
      </table>
    </VuSlideUpDown>
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
