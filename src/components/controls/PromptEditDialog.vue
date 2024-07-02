<script lang="ts">
export type DialogData = {
  categoryId: string;
  prompt: string;
  description: string;
};
export type CategoryInfo = Pick<CategoryRecord, 'id' | 'name'>;
</script>
<script setup lang="ts">
import { ref } from 'vue';
import { useConfirmDialog } from '@vueuse/core';
import SimpleButton from '../parts/SimpleButton.vue';
import IconButton from '../parts/IconButton.vue';
import ConfirmDialog from './ConfirmDialog.vue';
import { CategoryRecord } from '../../data/category-record';

defineProps<{
  categoryList: CategoryInfo[];
}>();

const { cancel, confirm, reveal, isRevealed } = useConfirmDialog<
  any,
  'submit' | 'delete'
>();

const category = ref('');
const prompt = ref('');
const description = ref('');
const canDelete = ref(false);

async function modal(
  input?: DialogData,
): Promise<DialogData | null | 'delete'> {
  canDelete.value = input != null;
  category.value = input?.categoryId ?? '';
  prompt.value = input?.prompt ?? '';
  description.value = input?.description ?? '';
  const result = await reveal();
  if (result.isCanceled) {
    return null;
  } else {
    if (result.data === 'submit') {
      return {
        categoryId: category.value,
        prompt: prompt.value,
        description: description.value,
      };
    } else {
      return 'delete';
    }
  }
}

const confirmDialogRef = ref<InstanceType<typeof ConfirmDialog> | null>(null);
async function onDelete() {
  const result = (await confirmDialogRef.value?.modal('削除します。')) ?? false;
  if (result) {
    confirm('delete');
  }
}

defineExpose({
  modal,
});
</script>
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="modal-base" v-if="isRevealed">
        <ConfirmDialog ref="confirmDialogRef" />
        <div class="dialog">
          <div class="delete-button" v-if="canDelete">
            <IconButton
              icon="delete"
              @click="onDelete"
              tooltip="プロンプトを削除"
            />
          </div>
          <form @submit.prevent="() => confirm('submit')">
            <div class="form-inner">
              <div class="label"><label for="category">カテゴリ</label></div>
              <div class="input">
                <select
                  id="category"
                  class="form-item"
                  required
                  v-model="category"
                >
                  <option
                    v-for="cat in categoryList"
                    :key="cat.id"
                    :value="cat.id"
                  >
                    {{ cat.name }}
                  </option>
                </select>
              </div>
              <div class="label"><label for="prompt">プロンプト</label></div>
              <div class="input">
                <input
                  id="prompt"
                  class="form-item"
                  type="text"
                  required
                  v-model="prompt"
                />
              </div>
              <div class="label"><label for="desc">備考</label></div>
              <div class="input">
                <input
                  id="desc"
                  class="form-item"
                  type="text"
                  v-model="description"
                />
              </div>
              <div></div>
              <div class="button-area">
                <SimpleButton caption="OK" type="submit" size="small" />
                <SimpleButton
                  caption="Cancel"
                  size="small"
                  variant="cancel"
                  @click="cancel"
                />
              </div>
            </div>
          </form>
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
  position: relative;
}
.form-inner {
  display: grid;
  align-items: center;
  margin: 1rem;
  grid-template-columns: repeat(3, 1fr);
  div {
    margin: 0.5rem;
  }
  .label {
    text-align: right;
  }
  .input {
    grid-column: 2 / 4;
    select {
      width: 100%;
    }
    input {
      width: 100%;
    }
  }
  .button-area {
    grid-column: 1/4;
    display: flex;
    justify-content: space-evenly;
  }
}
.delete-button {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
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
