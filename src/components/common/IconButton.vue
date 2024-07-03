<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
    tooltip?: string;
    htmlTooltip?: boolean;
  }>(),
  {
    type: 'button',
    disabled: false,
  },
);
</script>
<template>
  <button
    class="icon-button"
    :type="type"
    :disabled="disabled"
    v-tooltip.bottom-start="{
      content: tooltip,
      html: htmlTooltip,
    }"
  >
    <div class="material-symbols-outlined md-24">{{ icon }}</div>
  </button>
</template>
<style scoped lang="scss">
.icon-button {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  &:enabled {
    color: var(--light-color);
    background-color: var(--bg-color);

    &:hover {
      background-color: var(--icon-active);
      color: var(--main-color);
      cursor: pointer;
    }
  }
  &:disabled {
    color: var(--bg-color);
    background-color: var(--sub-bg-color);
  }
}
</style>
