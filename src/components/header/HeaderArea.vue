<script setup lang="ts">
import IconButton from '../parts/IconButton.vue';
import ImportDialog from '../controls/ImportDialog.vue';
import { ref } from 'vue';
import { exportTsv } from '../../data/data-import-export';
import AboutDialog from './AboutDialog.vue';

const importDialogRef = ref<InstanceType<typeof ImportDialog> | null>(null);

async function onImport() {
  await importDialogRef.value?.modal();
}

async function onExport() {
  await exportTsv();
}

const aboutDialogRef = ref<InstanceType<typeof AboutDialog> | null>();
async function onHelp() {
  await aboutDialogRef.value?.modal();
}

const emit = defineEmits<{ categoryEdit: []; addPrompt: [] }>();
</script>
<template>
  <div class="header">
    <AboutDialog ref="aboutDialogRef" />
    <div class="title">avalabプロンプト入力支援</div>
    <div class="icon-area">
      <div class="icon-item">
        <IconButton
          class="icon"
          icon="playlist_add"
          @click.stop="emit('addPrompt')"
          tooltip="プロンプトの追加"
        />
      </div>
      <div class="icon-item">
        <IconButton
          class="icon"
          icon="edit_note"
          @click="emit('categoryEdit')"
          tooltip="カテゴリ編集"
        />
      </div>
      <div class="icon-item">
        <IconButton
          class="icon"
          icon="download"
          @click="onExport"
          tooltip="エクスポート"
        />
      </div>
      <div class="icon-item">
        <IconButton
          class="icon"
          icon="upload"
          @click="onImport"
          tooltip="インポート"
        />
      </div>
      <div class="icon-item">
        <IconButton
          class="icon"
          icon="help"
          @click="onHelp"
          tooltip="ツールの情報"
        />
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
