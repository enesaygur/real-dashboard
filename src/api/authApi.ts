type LoginResponse = {
  email: string;
};
export function fakeLogin(
  email: string,
  password: string,
): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@example.com" && password === "123456") {
        resolve({ email });
        return;
      }

      if (email === "user@example.com" && password === "123456") {
        resolve({ email });
        return;
      }
      reject(new Error("Invalid credentials"));
    }, 1500);
  });
}
