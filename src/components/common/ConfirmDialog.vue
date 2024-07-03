<script lang="ts">
export type DialogData = {
  prompt: string;
  description: string;
};
</script>
<script setup lang="ts">
import { ref } from 'vue';
import { useConfirmDialog } from '@vueuse/core';
import SimpleButton from '@components/common/SimpleButton.vue';

const { cancel, confirm, reveal, isRevealed } = useConfirmDialog();

const messageText = ref('');

async function modal(message: string): Promise<boolean> {
  messageText.value = message;
  const reuslt = await reveal();
  return !reuslt.isCanceled;
}

defineExpose({
  modal,
});
</script>
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="modal-base" v-if="isRevealed">
        <div class="dialog">
          <div class="message">{{ messageText }}</div>
          <div class="button-area">
            <SimpleButton caption="OK" size="small" @click="confirm" />
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
.modal-base {
  z-index: calc(var(--modal-z-index) * 2);
}
.dialog {
  border-radius: var(--dialog-border-radius);
  width: 80%;
  padding: 1rem;
  background-color: var(--bg-color);
  margin: 10rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.message {
  margin-bottom: 1rem;
}
.button-area {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
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
