import { loadOptions, watchOptions } from '@models/options/data-store';
import { PromptMessage } from '@messages/message-types';

const sleep = (ms: number) =>
  new Promise<void>((resolv) => setTimeout(resolv, ms));

const isTargetInput = (node: Node): node is HTMLInputElement => {
  if (!(node instanceof HTMLInputElement)) {
    return false;
  }
  if (node.parentElement?.parentElement?.classList.contains('tag-input')) {
    return true;
  }
  return false;
};

const isTargetButton = (node: Node): node is HTMLButtonElement => {
  if (!(node instanceof HTMLButtonElement)) {
    return false;
  }

  if (
    node.type === 'submit' &&
    node.parentElement?.parentElement?.classList.contains('tag-input')
  ) {
    return true;
  }

  return false;
};

const hideSuggest = (node: Node): void => {
  if (!(node instanceof HTMLElement)) {
    return;
  }
  if (node.classList.contains('suggest')) {
    node.style.display = 'none';
  }
};

async function main() {
  let input: any = undefined;
  let button: any = undefined;
  let hideOption = (await loadOptions()).hidePromptSuggest;
  watchOptions((options) => (hideOption = options.hidePromptSuggest));

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const target of record.addedNodes) {
        if (isTargetInput(target)) {
          input = target;
        }
        if (isTargetButton(target)) {
          button = target;
        }
        if (hideOption) {
          hideSuggest(target);
        }
      }
    }
  });

  observer.observe(document.getElementsByTagName('body')[0], {
    childList: true,
    subtree: true,
  });

  chrome.runtime.onMessage.addListener(async (message: PromptMessage) => {
    if (
      input instanceof HTMLInputElement &&
      button instanceof HTMLButtonElement
    ) {
      const prompt =
        input.value && !input.value.endsWith(',')
          ? ',' + message.prompt
          : message.prompt;
      input.focus();
      await sleep(10);
      input.value = input.value + prompt;
      await sleep(10);
      input.dispatchEvent(new InputEvent('input', { data: prompt }));
      if (message.submit) {
        await sleep(10);
        input.blur();
        await sleep(10);
        button.click();
      }
    }
  });
}

main();
