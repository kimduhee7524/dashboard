export const campaignKeys = {
  all: ['campaigns'] as const,
  lists: () => [...campaignKeys.all, 'list'] as const,
};

export const dailyStatKeys = {
  all: ['dailyStats'] as const,
  lists: () => [...dailyStatKeys.all, 'list'] as const,
};
