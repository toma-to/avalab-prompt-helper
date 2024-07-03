import { PromptRecord } from './prompt-record';

export type CategoryRecord = {
  id: string;
  name: string;
  prompts: PromptRecord[];
};
