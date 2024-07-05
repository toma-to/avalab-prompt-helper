<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside, useConfirmDialog } from '@vueuse/core';
import {
  documentPageUrl,
  githubUrl,
  licenseUrl,
  thirdPartyUrl,
} from '@common/constants';
import { getManifestInfo } from '@utils/manifest.util';

const { appName, version, iconUrl } = getManifestInfo();

const { cancel, reveal, isRevealed } = useConfirmDialog();
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
          <div class="app-image">
            <img :src="iconUrl" alt="アイコン" />
          </div>
          <div class="app-title">{{ appName }}</div>
          <div class="app-version">version&nbsp;{{ version }}</div>
          <div class="help-link">
            <a :href="documentPageUrl" target="_blank">ヘルプ</a
            ><a :href="githubUrl" target="_blank"
              ><img
                class="github-icon"
                src="/assets/github-mark.svg"
                alt="GitHub"
            /></a>
          </div>
          <div class="license">
            <a :href="licenseUrl" target="_blank">ライセンス情報</a>
          </div>
          <div class="license third-party">
            <a :href="thirdPartyUrl" target="_blank">Third pary license</a>
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
  div {
    margin: 1rem;
  }
  .app-image {
    border: 1px solid var(--sub-color);
    img {
      width: 128px;
      height: 128px;
    }
  }
  .app-title {
    margin-bottom: 0;
    font-weight: bold;
  }
  .app-version {
    margin-top: 0.5rem;
  }
  .help-link {
    display: flex;
    align-items: center;
    justify-content: center;
    .github-icon {
      width: 24px;
      height: 24px;
      margin-left: 1rem;
    }
  }
  .license {
    font-size: var(--small-font-size);
    width: 100%;
    text-align: right;
    margin-bottom: 0;
  }
  .third-party {
    margin-top: 0.2rem;
    margin-bottom: 1rem;
  }
}
</style>
