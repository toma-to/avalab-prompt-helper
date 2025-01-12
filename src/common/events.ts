import { EventBusKey } from '@vueuse/core';
import { PromptRecord } from '@models/prompts/prompt-record';
import { eventBusSymbolName } from './constants';

export const importEventKey: EventBusKey<{}> = Symbol(eventBusSymbolName);

export const expandToggleEventKey: EventBusKey<{ expand: boolean }> =
  Symbol(eventBusSymbolName);

export const expandNotifyEventKey: EventBusKey<{}> = Symbol(eventBusSymbolName);

export const editPromptEventKey: EventBusKey<{
  target: PromptRecord;
  categoryId: string;
}> = Symbol(eventBusSymbolName);

export const addPromptEventKey: EventBusKey<{}> = Symbol(eventBusSymbolName);

export const editCategoryEventKey: EventBusKey<{}> = Symbol(eventBusSymbolName);

export const promptFilterEventKey: EventBusKey<{ filters: string[] }> =
  Symbol(eventBusSymbolName);
