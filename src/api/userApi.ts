import type { User } from "../types/user";

export function getUser(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "John Doe",
          email: "admin@example.com",
          role: "Admin",
        },
        {
          id: 2,
          name: "Jane Doe",
          email: "user@example.com",
          role: "User",
        },
        {
          id: 3,
          name: "Bob Smith",
          email: "user2@example.com",
          role: "User",
        },
      ]);
    }, 800);
  });
}
