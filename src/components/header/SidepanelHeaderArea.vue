<script setup lang="ts">
import { ref } from 'vue';
import AddPromptButton from '@components/buttons/AddPromptButton.vue';
import EditCategoryButton from '@components/buttons/EditCategoryButton.vue';
import ExportButton from '@components/buttons/ExportButton.vue';
import ImportButton from '@components/buttons/ImportButton.vue';
import OptionsButton from '@components/buttons/OptionsButton.vue';
import IconButton from '@components/common/IconButton.vue';
import AboutDialog from './AboutDialog.vue';

const aboutDialogRef = ref<InstanceType<typeof AboutDialog> | null>();
async function onHelp() {
  await aboutDialogRef.value?.modal();
}
</script>
<template>
  <div class="header">
    <AboutDialog ref="aboutDialogRef" />
    <div class="icon-area">
      <div class="icon-item">
        <AddPromptButton class="icon" />
      </div>
      <div class="icon-item">
        <EditCategoryButton class="icon" />
      </div>
      <div class="icon-item">
        <ExportButton class="icon" />
      </div>
      <div class="icon-item">
        <ImportButton class="icon" />
      </div>
      <div class="icon-item">
        <OptionsButton class="icon" />
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
  </div>
</template>
<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: var(--header-area-height);
  display: flex;
  align-items: center;
  justify-content: end;
  background: linear-gradient(to right, var(--main-color), var(--sub-color));
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
