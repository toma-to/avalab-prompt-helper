<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import IconButton from '../parts/IconButton.vue';

const props = withDefaults(
  defineProps<{
    index: number;
    id: string;
    name: string;
    total: number;
    isNew?: boolean;
  }>(),
  { isNew: false },
);

const canUp = computed(() => props.index > 0);
const canDown = computed(() => props.index + 1 < props.total);

const emit = defineEmits<{
  editStatus: [id: string, status: boolean];
  nameChanged: [id: string, name: string];
  delete: [id: string, index: number];
  toUp: [index: number];
  toDown: [index: number];
}>();

// 編集
const editing = ref(props.isNew);
const editText = ref(props.name);
function onSubmit() {
  emit('nameChanged', props.id, editText.value);
  editing.value = false;
}
function onEditCancel() {
  editText.value = props.name;
  editing.value = false;
}
watch(editing, (val) => emit('editStatus', props.id, val));
</script>
<template>
  <div class="category-row">
    <form @submit.prevent="onSubmit">
      <div class="icon-area">
        <IconButton
          icon="arrow_drop_up"
          :disabled="!canUp"
          @click="emit('toUp', index)"
        />
        <IconButton
          icon="arrow_drop_down"
          :disabled="!canDown"
          @click="emit('toDown', index)"
        />
      </div>
      <div class="name-area">
        <input
          type="text"
          class="form-item"
          v-if="editing"
          v-model="editText"
          required
        />
        <template v-else>{{ name }}</template>
      </div>
      <div class="icon-area">
        <template v-if="editing">
          <IconButton icon="check" type="submit" />
          <IconButton icon="backspace" @click="onEditCancel" />
        </template>
        <template v-else>
          <IconButton icon="edit" @click="editing = true" />
          <IconButton
            icon="delete_forever"
            @click="emit('delete', id, index)"
          />
        </template>
      </div>
    </form>
  </div>
</template>
<style scoped lang="scss">
.category-row {
  width: 100%;
  padding: 0.25rem 0;
  border-bottom: solid 2px var(--light-color);
  display: flex;
  align-items: center;
  form {
    display: contents;
  }
}
.icon-area {
  display: flex;
  justify-content: space-between;
  width: 65px;
}
.name-area {
  padding: 0 0.5rem;
  line-height: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: calc(100% - 124px);
  input {
    width: 90%;
  }
}
</style>
