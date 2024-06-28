import { EventBusKey } from '@vueuse/core';
import { CategoryRecord } from './data/category-record';
import { eventBusSymbolName } from './constants';

export const importEventKey: EventBusKey<{ records: CategoryRecord[] }> =
  Symbol(eventBusSymbolName);
