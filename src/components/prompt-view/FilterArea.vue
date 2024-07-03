<script setup lang="ts">
import FilterInput from './input/FilterInput.vue';
import ExpandToggleButton from './input/ExpandToggleButton.vue';
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
