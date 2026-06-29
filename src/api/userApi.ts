import type { User } from "../types/user";
const ALL_USERS: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Mike Brown", email: "mike@example.com", role: "User" },
  { id: 4, name: "Sarah Lee", email: "sarah@example.com", role: "User" },
  { id: 5, name: "Tom Hardy", email: "tom@example.com", role: "User" },
  { id: 6, name: "Emma Stone", email: "emma@example.com", role: "User" },
];
export function getUser(page: number, limit: number) {
  return new Promise<{ data: User[]; total: number }>((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = start + limit;
      resolve({
        data: ALL_USERS.slice(start, end),
        total: ALL_USERS.length,
      });
    }, 500);
  });
}
