import { Ref } from 'vue';
import { defineLoadStore } from '@utils/storage.util';
import { Options, optionsDefault } from './options';

const APP_OPTIONS = 'APP_OPTIONS';

const { load: loadOptions, store: storeOptions } = defineLoadStore<Options>(
  APP_OPTIONS,
  optionsDefault,
);

export { loadOptions, storeOptions };

export const storeOptionsRef = async (options: Ref<Options>): Promise<void> => {
  await storeOptions({
    hidePromptSuggest: options.value.hidePromptSuggest,
  });
};

export const watchOptions = (callback: (options: Options) => void) => {
  chrome.storage.local?.onChanged.addListener((changes) => {
    if (changes[APP_OPTIONS]) {
      callback(changes[APP_OPTIONS].newValue);
    }
  });
};
