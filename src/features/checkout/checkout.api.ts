import { apiClient } from "../../lib/apiClient";

export async function createCheckoutLink(reportId: string) {
  const response = await apiClient.api.reports[":id"].checkout.$post({ param: { id: reportId } });

  if (!response.ok) {
    throw new Error("Could not create checkout link.");
  }

  return await response.json();
}
