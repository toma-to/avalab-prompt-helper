import { Ref } from 'vue';
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
  console.log(data.value);
  const list: CategoryRecord[] = data.value.map((val) => ({
    id: val.id,
    name: val.name,
    prompts: val.prompts.map((p) => ({
      id: p.id,
      prompt: p.prompt,
      description: p.description,
    })),
  }));
  console.log(list);
  await storeRecords(list);
};
