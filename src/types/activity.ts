export interface Activity {
  id: number;
  message: string;
  type: "create" | "update" | "delete";
  createdAt: string;
}
