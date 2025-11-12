export const QUERY_KEYS = {
  USERS: ['users'] as const,
  USER: (id: string) => ['user', id] as const,
} as const;
