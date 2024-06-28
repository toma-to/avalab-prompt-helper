<script setup lang="ts">
defineProps<{ icon: string }>();
</script>
<template>
  <div class="icon-button">
    <div class="material-symbols-outlined md-24">{{ icon }}</div>
  </div>
</template>
<style scoped lang="scss">
.icon-button {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: var(--light-color);

  &:hover {
    background-color: var(--icon-active);
    color: var(--main-color);
    cursor: pointer;
  }
}
</style>
