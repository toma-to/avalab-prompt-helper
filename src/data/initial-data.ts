import { CategoryRecord } from './category-record';

export const initialData: CategoryRecord[] = [
  {
    id: crypto.randomUUID(),
    name: '品質',
    prompts: [
      {
        id: crypto.randomUUID(),
        description: '全体品質',
        prompt: 'ultra detailed,best quality,high resolution',
      },
      {
        id: crypto.randomUUID(),
        description: '顔の品質',
        prompt:
          'beautifully detailed hair,defined detailed face,beautiful detailed eyes',
      },
      {
        id: crypto.randomUUID(),
        description: '背景品質',
        prompt: 'detailed background',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: '構図',
    prompts: [
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
];
