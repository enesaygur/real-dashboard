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
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1500);
  });
}
