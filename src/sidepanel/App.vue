<script setup lang="ts">
import { useRecords } from '@models/prompts/data-store';
import CategoryEditControl from '@components/edit-records/CategoryEditControl.vue';
import PromptAddEditControl from '@components/edit-records/PromptAddEditControl.vue';
import SidepanelHeaderArea from '@components/header/SidepanelHeaderArea.vue';
import ImportControl from '@components/import/ImportControl.vue';
import FilterArea from '@components/prompt-view/FilterArea.vue';
import PromptBox from '@components/prompt-view/PromptBox.vue';

const records = useRecords();
</script>

<template>
  <div class="main">
    <PromptAddEditControl v-model="records" />
    <CategoryEditControl v-model="records" />
    <ImportControl v-model="records" />
    <SidepanelHeaderArea />
    <FilterArea class="filter-area" />
    <PromptBox
      v-for="record in records"
      :key="record.id"
      :id="record.id"
      :records="record.prompts"
      :category="record.name"
    />
  </div>
</template>

<style scoped lang="scss">
.main {
  padding-top: calc(
    var(--header-area-height) + var(--filter-area-height) + 0.5rem
  );
  margin-bottom: 3rem;
}
.filter-area {
  position: fixed;
  top: var(--header-area-height);
  left: 0;
  right: 0;
  height: var(--filter-area-height);
  background-color: var(--bg-color);
  border-bottom: solid 1px var(--sub-color);
  padding-right: 1rem;
}
</style>
