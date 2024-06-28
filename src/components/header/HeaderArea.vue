<script setup lang="ts">
import IconButton from '../parts/IconButton.vue';
import ImportDialog from '../controls/ImportDialog.vue';
import { ref } from 'vue';
import { exportTsv } from '../../data/data-import-export';

const importDialogRef = ref<InstanceType<typeof ImportDialog> | null>(null);

async function onImport() {
  await importDialogRef.value?.modal();
}

async function onExport() {
  await exportTsv();
}

const emit = defineEmits<{ categoryEdit: [] }>();
</script>
<template>
  <div class="header">
    <div class="title">avalabプロンプト入力補助</div>
    <div class="icon-area">
      <div class="icon-item">
        <IconButton
          class="icon"
          icon="edit_note"
          @click="emit('categoryEdit')"
        />
      </div>
      <div class="icon-item">
        <IconButton class="icon" icon="download" @click="onExport" />
      </div>
      <div class="icon-item">
        <IconButton class="icon" icon="upload" @click="onImport" />
      </div>
    </div>
    <ImportDialog ref="importDialogRef" />
  </div>
</template>
<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to right, var(--main-color), var(--sub-color));
  .title {
    margin-left: 1rem;
    color: var(--bg-color);
  }
  .icon-area {
    display: flex;
    align-items: center;
    justify-content: end;
    .icon-item {
      margin-right: 0.5rem;
      .icon {
        background-color: var(--bg-color);
        &:hover {
          background-color: var(--accent-bg-color);
        }
      }
    }
  }
}
</style>
