import type { User } from "../types/user";
let ALL_USERS: User[] = [
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

export function deleteUser(id: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      ALL_USERS = ALL_USERS.filter((user) => user.id !== id);
      resolve();
    }, 500);
  });
}

export function createUser(user: Omit<User, "id">): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: Date.now(),
        ...user,
      };
      ALL_USERS.push(newUser);
      resolve(newUser);
    }, 500);
  });
}

export function updateUser(
  id: number,
  updatedUser: Omit<User, "id">,
): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = ALL_USERS.findIndex((user) => user.id === id);
      ALL_USERS[index] = { id, ...updatedUser };
      resolve(ALL_USERS[index]);
    }, 500);
  });
}
