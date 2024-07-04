export const defineLoadStore = <T>(
  storageKey: string,
  initialData: T,
): {
  load: () => Promise<T>;
  store: (data: T) => Promise<void>;
} => {
  const load = async () => {
    const data = await chrome.storage?.local.get(storageKey);
    const options = data ? data[storageKey] : undefined;
    return options ?? initialData;
  };
  const store = async (data: T) => {
    const obj: { [key: string]: any } = {};
    obj[storageKey] = data;
    console.log('start set', data);
    await chrome.storage?.local.set(obj);
    console.log('end set', data);
  };

  return { load, store };
};
