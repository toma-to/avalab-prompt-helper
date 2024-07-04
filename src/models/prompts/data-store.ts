import { Ref, ref } from 'vue';
import { defineLoadStore } from '@utils/storage.util';
import { CategoryRecord } from './category-record';
import { initialData } from './initial-data';

const { load: loadRecords, store: storeRecords } = defineLoadStore<
  CategoryRecord[]
>('CATEGORY_DATA', initialData);
export { loadRecords, storeRecords };

export const storeRecordsRef = async (
  data: Ref<CategoryRecord[]>,
): Promise<void> => {
  const list: CategoryRecord[] = data.value.map((val) => ({
    id: val.id,
    name: val.name,
    prompts: val.prompts.map((p) => ({
      id: p.id,
      prompt: p.prompt,
      description: p.description,
    })),
  }));
  await storeRecords(list);
};

export const useRecords = (): Ref<CategoryRecord[]> => {
  const records = ref<CategoryRecord[]>([]);

  loadRecords().then((value) => (records.value = value));
  chrome.storage?.local.onChanged.addListener((changes) => {
    if (changes['CATEGORY_DATA']) {
      records.value = changes['CATEGORY_DATA'].newValue;
    }
  });

  return records;
};
