import { CategoryRecord } from './category-record';
import { initialData } from './initial-data';

const RECORDS_KEY = 'CATEGORY_DATA';

export const loadRecords = async (): Promise<CategoryRecord[]> => {
  const data = await chrome.storage?.local.get(RECORDS_KEY);
  const records = data ? data[RECORDS_KEY] : undefined;
  return records ?? initialData;
};

export const storeRecords = async (data: CategoryRecord[]): Promise<void> => {
  const obj: { [key: string]: any } = {};
  obj[RECORDS_KEY] = data;
  await chrome.storage?.local.set(obj);
};