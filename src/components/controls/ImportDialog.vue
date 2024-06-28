<script setup lang="ts">
import { ref } from 'vue';
import FileSelectButton from '../parts/FileSelectButton.vue';

const reading = ref(false);

// ファイルインポート処理
import { importTsv } from '../../data/data-import-export';
import { useEventBus } from '@vueuse/core';
import { importEventKey } from '../../events';

const { emit } = useEventBus(importEventKey);

function onFileSelected(file: File) {
  reading.value = true;
  const reader = new FileReader();
  reader.onload = onFileLoaded;
  reader.readAsText(file);
}
async function onFileLoaded(ev: ProgressEvent<FileReader>) {
  if (typeof ev.target?.result === 'string') {
    const result = await importTsv(ev.target.result);
    if (result === 'error') {
      window.alert('ファイルが正しくありません。');
    } else {
      emit({ records: result });
      confirm();
    }
  } else {
    window.alert('ファイルが正しくありません。');
  }
}

// ダイアログ処理
import { useConfirmDialog, onClickOutside } from '@vueuse/core';
const { cancel, confirm, reveal, isRevealed } = useConfirmDialog();
async function modal(): Promise<void> {
  await reveal();
}
const dialogRef = ref(null);
onClickOutside(dialogRef, cancel);

defineExpose({
  modal,
});
</script>
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="modal-base" v-if="isRevealed">
        <div class="dialog" ref="dialogRef">
          <div class="message item">
            インポートするファイルを選択してください。
          </div>
          <div class="item">
            <FileSelectButton
              @selected="onFileSelected"
              accept=".tsv,.txt"
              :disabled="reading"
            />
          </div>
          <div class="warning item">
            ※ファイルをインポートすると、現在設定されているプロンプト情報は消去されます。
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
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .item {
    margin: 1rem;
  }
  .message {
    font-size: var(--small-font-size);
  }
  .warning {
    color: var(--danger-color);
  }
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
