import { apiClient } from "@/lib/apiClient";

export async function deleteAccount(): Promise<void> {
  const response = await apiClient.api.auth.account.delete.$post();
  if (!response.ok) {
    throw new Error("Failed to delete account");
  }
}
