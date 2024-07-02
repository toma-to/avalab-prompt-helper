import { CategoryRecord } from './category-record';
import { parse } from 'csv-parse/browser/esm/sync';
import { stringify } from 'csv-stringify/browser/esm/sync';
import { loadRecords, storeRecords } from './data-store';
import { uncategorizedCategoryId } from '../constants';

export const importTsv = async (
  tsv: string,
): Promise<CategoryRecord[] | 'error'> => {
  try {
    const parsed = parse(tsv, {
      delimiter: '\t',
      bom: true,
      skipEmptyLines: true,
    }) as string[][];
    if (parsed.find((val) => val.length < 3)) {
      console.error('bad tsv', parsed);
      return 'error';
    }

    const categories: CategoryRecord[] = [
      ...new Set(parsed.map((val) => val[0].trim())),
    ]
      .filter((val) => val !== '')
      .map((val) => ({
        id: crypto.randomUUID(),
        name: val,
        prompts: [],
      }));
    const uncategorized: CategoryRecord = {
      id: uncategorizedCategoryId,
      name: '未分類',
      prompts: [],
    };

    for (const prompt of parsed) {
      const cat =
        categories.find((val) => val.name === prompt[0].trim()) ??
        uncategorized;
      cat.prompts.push({
        id: crypto.randomUUID(),
        prompt: prompt[1],
        description: prompt[2],
      });
    }

    const mergedCategories =
      uncategorized.prompts.length > 0
        ? [...categories, uncategorized]
        : categories;

    await storeRecords(mergedCategories);

    return mergedCategories;
  } catch (err) {
    console.error(err);
    return 'error';
  }
};

export const exportTsv = async (): Promise<void> => {
  const categories = await loadRecords();

  const records = categories.flatMap((val) =>
    val.prompts.map((p) => [
      val.id === '' ? '' : val.name,
      p.prompt,
      p.description,
    ]),
  );
  const data = stringify(records, { delimiter: '\t' });
  const blob = new Blob([data], {
    type: 'text/plain',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'prompt.tsv';
  a.click();
};
