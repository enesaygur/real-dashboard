export interface Room {
  id: number;
  number: string;
  type: "Single" | "Double" | "Suite";
  price: number;
  status: "Available" | "Occupied";
}
