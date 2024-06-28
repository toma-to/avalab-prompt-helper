<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    caption: string;
    size?: 'small' | 'normal' | 'large';
    variant?: 'confirm' | 'cancel';
    disabled?: boolean;
    type?: 'button' | 'submit';
  }>(),
  {
    size: 'normal',
    variant: 'confirm',
    disabled: false,
    type: 'button',
  },
);

const styles = computed(() => [
  'button',
  'size-' + props.size,
  'color-' + props.variant,
]);

const emit = defineEmits<{ click: [] }>();
function onClick() {
  if (!props.disabled) {
    emit('click');
  }
}
</script>
<template>
  <button
    :class="styles"
    @click.stop="onClick"
    :type="type"
    :disabled="disabled"
  >
    {{ caption }}
  </button>
</template>
<style scoped lang="scss">
.button {
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  font-size: var(--nomal-font-size);
  &:enabled {
    cursor: pointer;
    color: var(--main-color);
    &:hover {
      background-color: var(--active-color);
    }
  }
  &:disabled {
    color: var(--light-color);
    opacity: 0.5;
  }
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
  border: none;
}
.color-cancel {
  background-color: var(--light-color);
  border: solid 1px var(--accent-bg-color);
}
</style>
