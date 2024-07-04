<script setup lang="ts">
import ExpandToggleButton from './input/ExpandToggleButton.vue';
import FilterInput from './input/FilterInput.vue';
</script>
<template>
  <div class="search-input">
    <div class="expand-all">
      <ExpandToggleButton />
    </div>
    <FilterInput />
  </div>
</template>
<style scoped lang="scss">
.search-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.expand-all {
  margin-left: 0.5rem;
}
</style>
