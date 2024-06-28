import { ContentScriptMessage } from './data/content-script-message';

const sleep = (ms: number) =>
  new Promise<void>((resolv) => setTimeout(resolv, ms));

async function main() {
  let input: any = undefined;
  let button: any = undefined;

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const target of record.addedNodes) {
        if (
          target instanceof HTMLInputElement &&
          target.type === 'text' &&
          target.placeholder.startsWith('追加する属性を入力')
        ) {
          input = target;
        } else if (
          target instanceof HTMLSpanElement &&
          target.textContent === '追加' &&
          target.parentElement instanceof HTMLButtonElement
        ) {
          button = target.parentElement;
        }
      }
    }
  });

  observer.observe(document.getElementsByTagName('body')[0], {
    childList: true,
    subtree: true,
  });

  chrome.runtime.onMessage.addListener(
    async (message: ContentScriptMessage) => {
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
    },
  );
}

main();
