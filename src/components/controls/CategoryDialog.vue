<script lang="ts">
export type DialogData = {
  categoryId: string;
  categoryName: string;
};
</script>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useConfirmDialog } from '@vueuse/core';
import SimpleButton from '../parts/SimpleButton.vue';
import CategoryDialogRecord from './CategoryDialogRecord.vue';
import IconButton from '../parts/IconButton.vue';

const records = ref<(DialogData & { isNew?: boolean })[]>([]);
const editingList = ref<Map<string, boolean>>(new Map<string, boolean>());
const canOk = computed(() =>
  [...editingList.value.values()].every((val) => !val),
);

// 編集
function onEditStatus(id: string, status: boolean) {
  editingList.value.set(id, status);
}
function onNameChanged(id: string, name: string) {
  const target = records.value.find((val) => val.categoryId === id);
  if (target) {
    target.categoryName = name;
  }
}

// 並び替え
function onUp(index: number) {
  const target = records.value.splice(index, 1);
  records.value.splice(index - 1, 0, ...target);
}
function onDown(index: number) {
  const target = records.value.splice(index, 1);
  records.value.splice(index + 1, 0, ...target);
}

// 削除・追加
function onDelete(id: string, index: number) {
  records.value.splice(index, 1);
  editingList.value.delete(id);
}
function onAdd() {
  const id = crypto.randomUUID();
  records.value.push({
    categoryId: id,
    categoryName: 'New Category',
    isNew: true,
  });
  editingList.value.set(id, true);
}

// ダイアログ処理
const { cancel, confirm, reveal, isRevealed } = useConfirmDialog();

async function modal(input: DialogData[]): Promise<DialogData[] | null> {
  records.value = input;
  const result = await reveal();
  if (result.isCanceled) {
    return null;
  } else {
    return records.value;
  }
}

defineExpose({ modal });
</script>
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="modal-base" v-if="isRevealed">
        <ConfirmDialog ref="confirmDialogRef" />
        <div class="dialog">
          <h1 class="title">カテゴリ編集</h1>
          <div class="list-area">
            <CategoryDialogRecord
              v-for="(record, i) in records"
              :key="record.categoryId"
              :index="i"
              :id="record.categoryId"
              :name="record.categoryName"
              :total="records.length"
              :is-new="record.isNew"
              @edit-status="onEditStatus"
              @name-changed="onNameChanged"
              @to-up="onUp"
              @to-down="onDown"
              @delete="onDelete"
            />
          </div>
          <div class="add-icon-area">
            <IconButton icon="list_alt_add" @click="onAdd" />
          </div>
          <div class="button-area">
            <SimpleButton
              caption="OK"
              size="small"
              :disabled="!canOk"
              @click="confirm"
            />
            <SimpleButton
              caption="Cancel"
              size="small"
              variant="cancel"
              @click="cancel"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped lang="scss">
.dialog {
  border-radius: var(--dialog-border-radius);
  width: 80%;
  padding: 1rem;
  background-color: var(--bg-color);
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: var(--large-font-size);
}
.list-area {
  width: 95%;
  max-height: 380px;
  padding: 0 0.5rem;
  overflow-y: scroll;
  background-color: var(--sub-bg-color);
}
.add-icon-area {
  margin-top: 0.5rem;
  display: flex;
  justify-content: end;
  width: 100%;
}
.button-area {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
