import { EventBusKey } from '@vueuse/core';
import { CategoryRecord } from './data/category-record';
import { eventBusSymbolName } from './constants';
import { PromptRecord } from './data/prompt-record';

export const importEventKey: EventBusKey<{ records: CategoryRecord[] }> =
  Symbol(eventBusSymbolName);

export const expandTogleEventKey: EventBusKey<{ expand: boolean }> =
  Symbol(eventBusSymbolName);

export const editPromptEventKey: EventBusKey<{
  target: PromptRecord;
  categoryId: string;
}> = Symbol(eventBusSymbolName);

export const newPromptEventKey: EventBusKey<{ categoryId: string }> =
  Symbol(eventBusSymbolName);
