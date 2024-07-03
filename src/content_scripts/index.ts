import { PromptMessage } from '@messages/message-types';

const sleep = (ms: number) =>
  new Promise<void>((resolv) => setTimeout(resolv, ms));

const isTargetInput = (node: Node): node is HTMLInputElement => {
  if (!(node instanceof HTMLInputElement)) {
    return false;
  }
  if (node.parentElement?.classList.contains('tag-input')) {
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

async function main() {
  let input: any = undefined;
  let button: any = undefined;

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const target of record.addedNodes) {
        if (isTargetInput(target)) {
          input = target;
        }
        if (isTargetButton(target)) {
          button = target;
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
      input.focus();
      await sleep(10);
      input.value = input.value + message.prompt;
      await sleep(10);
      input.dispatchEvent(new InputEvent('input', { data: message.prompt }));
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
