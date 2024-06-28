import { CategoryRecord } from './category-record';

export const initialData: CategoryRecord[] = [
  {
    id: '',
    name: '未分類',
    prompts: [],
  },
  {
    id: crypto.randomUUID(),
    name: '構図',
    prompts: [
      {
        id: crypto.randomUUID(),
        description: '顔のみ',
        prompt: 'close-up',
      },
      {
        id: crypto.randomUUID(),
        description: '頭から肩まで',
        prompt: 'portrait',
      },
      {
        id: crypto.randomUUID(),
        description: '上半身',
        prompt: 'upper body',
      },
      {
        id: crypto.randomUUID(),
        description: '膝から上',
        prompt: 'cowboy shot',
      },
      {
        id: crypto.randomUUID(),
        description: '全身',
        prompt: 'full body',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: '表情',
    prompts:[
      {
        id: crypto.randomUUID(),
        description: '泣き顔',
        prompt: 'crying',
      },
      {
        id: crypto.randomUUID(),
        description: '小悪魔',
        prompt: 'evil smile',
      },
      {
        id: crypto.randomUUID(),
        description: 'ドヤ顔',
        prompt: 'smug face',
      },
      {
        id: crypto.randomUUID(),
        description: '無表情',
        prompt: 'expressionless',
      },
    ]
  }
];
