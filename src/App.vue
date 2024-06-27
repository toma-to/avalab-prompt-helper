<script setup lang="ts">
import { ref } from 'vue';
import PromptBox from './components/PromptBox.vue';
import { initialData } from './data/initial-data';
import { CategoryRecord } from './data/category-record';

const records = ref<CategoryRecord[]>(initialData);
</script>

<template>
  <PromptBox
    v-for="record in records"
    :records="record.prompts"
    :category="record.name"
  />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
