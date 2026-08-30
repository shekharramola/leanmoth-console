import { apiClient } from "@/lib/apiClient";

export async function listReports() {
  const response = await apiClient.api.reports.$get();
  if (!response.ok) {
    throw new Error("Failed to load reports");
  }
  return response.json();
}
