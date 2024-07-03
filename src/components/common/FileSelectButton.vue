<script setup lang="ts">
import SimpleButton from './SimpleButton.vue';

const props = withDefaults(
  defineProps<{
    caption?: string;
    size?: 'small' | 'normal' | 'large';
    type?: 'confirm' | 'cancel';
    disabled?: boolean;
    accept?: string;
  }>(),
  {
    caption: 'ファイルを選択',
    accept: '',
  },
);

const emit = defineEmits<{
  selected: [value: File];
}>();

function onClick() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = props.accept;
  input.addEventListener('change', (_) => {
    if (input.files && input.files[0]) {
      emit('selected', input.files[0]);
    }
  });
  input.click();
}
</script>
<template>
  <SimpleButton
    :caption="caption"
    :size="size"
    :variant="type"
    @click="onClick"
    :disabled="disabled"
  />
</template>
