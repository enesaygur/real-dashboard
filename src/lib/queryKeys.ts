export const queryKeys = {
  users: {
    all: ["users"] as const,
    list: (page: number, limit: number) => ["users", page, limit] as const,
  },
  dasboard: {
    stats: ["dashboard"] as const,
  },
};
