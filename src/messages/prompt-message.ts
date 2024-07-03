import { PromptMessage } from './message-types';

const sendMessage = async (prompt: string, submit: boolean) => {
  const tab = await chrome?.tabs?.query({ active: true, currentWindow: true });
  if (tab && tab[0]?.id) {
    chrome.tabs.sendMessage<PromptMessage>(tab[0].id, {
      messageType: 'prompt',
      prompt,
      submit,
    });
  }
};

export const applyPrompt = async (prompt: string): Promise<void> => {
  await sendMessage(prompt, true);
};

export const sendPrompt = async (prompt: string): Promise<void> => {
  const prompts = prompt
    .split(',')
    .map((val) => (val.startsWith('(') ? val + ',' : `(${val}),`));
  await sendMessage(prompts.join(''), false);
};
