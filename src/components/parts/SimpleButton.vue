<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    caption: string;
    size?: 'small' | 'normal' | 'large';
    type?: 'confirm' | 'cancel';
    disabled?: boolean;
  }>(),
  {
    size: 'normal',
    type: 'confirm',
    disabled: false,
  },
);

const styles = computed(() => [
  'button',
  'size-' + props.size,
  'color-' + props.type,
  props.disabled ? 'button-disable' : 'button-enable',
]);

const emit = defineEmits<{ click: [] }>();
function onClick() {
  if (!props.disabled) {
    emit('click');
  }
}
</script>
<template>
  <div :class="styles" @click.stop="onClick">{{ caption }}</div>
</template>
<style scoped lang="scss">
.button {
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  font-size: var(--nomal-font-size);
}
.button-enable {
  cursor: pointer;
  &:hover {
    background-color: var(--active-color);
  }
  color: var(--main-color);
}
.button-disable {
  color: var(--light-color);
  opacity: 0.5;
}
.size-small {
  width: 5rem;
}
.size-normal {
  width: 10rem;
}
.size-large {
  width: 15rem;
}
.color-confirm {
  background-color: var(--accent-bg-color);
}
.color-cancel {
  background-color: var(--bg-color);
  border: solid 1px var(--accent-bg-color);
}
</style>
