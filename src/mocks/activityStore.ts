import type { Activity } from "../types/activity";

let activities: Activity[] = [
  {
    id: 1,
    message: "Application started",
    type: "create",
    createdAt: new Date().toISOString(),
  },
];
export function getActivities() {
  return activities;
}

export function addActivity(
  message: string,
  type: "create" | "update" | "delete",
) {
  activities.push({
    id: activities.length + 1,
    message,
    type,
    createdAt: new Date().toISOString(),
  });
}
